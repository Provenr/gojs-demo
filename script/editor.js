const $ = go.GraphObject.make;    // 创建画布
let myDiagram = null;

let processData = '' // 流程数据

let PromiseFileList = [] // 读取的文件

let fileDataArr = [] // 读取的文件列表

//播放类型选项
var loopTypeOptions = [{
    code: '1',
    text: '是'
}, {
    code: '2',
    text: '否'
}];
const Editor = {
    data() {
        return {
            editorVal: '', // 可视化编辑的内容
            oldPerson: '',
            currentPerson: '', // 当前人员
            processTplName: '',
            currentNode: '', // 当前节点
            currentNodeIndex: 0, // 当前节点索引
            fileList: [],
            processJson: {
                _ID: "",
                _Name: ""
            },
            // oldPersonJson: {},
            currentPersonJson: {},
            personOptions: [],
            hasData: false,
            data: {}, // 导入进来的信息
            data1: { //片段信息
                ID: '', //Id
                Name: '', //片段名称
                //ClipFrame: ''     //起止帧，由起始帧和结束帧组成
                ClipFrameStart: '', //起始帧
                ClipFrameEnd: '', //结束帧
                Speed: 1.0, //速度
                TriggerObject: { //触发物体属性——单|与|或
                    TriggerRadio: '', //主单选按钮
                    SingleObject: '', //单物体
                    AndObjects: { //
                        AndRadio: '', //与单选按钮
                        NoSqcObjects: '', //无序
                        SqcObject1: '', //有序1
                        SqcObject2: '' //有序2
                    },
                    OrObjects: {
                        OrRadio: '', //或单选按钮
                        NoSqcObjects: '', //无序
                        SqcObject1: '', //有序1
                        SqcObject2: '' //有序2
                    }
                },
                TriggerObjectMove: '',
                Object: '' //物体
            },
        }
    },

    watch: {
        currentPerson(newData, oldData){
            if (oldData === '') {
                this.oldPerson = newData;
            } else {
                this.oldPerson = oldData;
            }
            console.log(this.currentPerson, this.oldPerson)
            let newPersonJson = null;
            let oldPersonJson = JSON.parse(JSON.stringify(this.currentPersonJson));
            this.currentPersonJson = null;
            this.currentNode = ''; // 人员改变 清空当前节点
            console.log(`old${this.oldPerson}`, oldPersonJson)
            // FIXME: 可能需要深拷贝
            fileDataArr.forEach(item => {
                if (item.personId && item.personId === this.oldPerson) {
                    item.json.ProcessConfigure = oldPersonJson;
                }
                if (item.personId && item.personId === newData) {
                    newPersonJson = JSON.parse(JSON.stringify(item.json));
                }
            })
            console.log(`new${newData}`, newPersonJson.ProcessConfigure)
            this.personParseData(newPersonJson, newData);
        },
        currentNode(newNode, oldNode) {
            let index = 0;
            let length = this.currentPersonJson.ProcessInfo.length;
            let nodeArr = this.currentPersonJson.ProcessInfo;
            for (let i = 0; i < length; i++) {
                if (nodeArr[i]._Index === newNode) {
                    index = i;
                    break;
                }
            }
            this.currentNodeIndex = index;
            console.log(this.currentNodeIndex)
        }
    },
    mounted() {
        this.initDiagram()
    },
    methods: {
        // 初始化
        initDiagram() {
            let self = this;
            console.log(this.currentNode)
            myDiagram = $(go.Diagram, "diagramEditor",   // 必须与Div元素的id属性一致
                {
                    initialContentAlignment: go.Spot.Center, // 居中显示内容
                    "undoManager.isEnabled": true, // 启用Ctrl-Z和Ctrl-Y撤销重做功能
                    allowDrop: true,  // 是否允许从Palette面板拖入元素
                    "LinkDrawn": this.showLinkLabel,  // 每次画线后调用的事件：为条件连线加上标签，该方法后面定义
                    "LinkRelinked": this.showLinkLabel,  // 每次重画线后调用的事件：同上LinkDrawn
                    scrollsPageOnFocus: false   // 图选中时页面不会滚动
                }
            );


            // 当图有改动时，在页面标题后加*
            myDiagram.addDiagramListener("Modified", function () {
                var idx = document.title.indexOf("*");
                if (myDiagram.isModified) {
                    if (idx < 0) document.title += "*";
                } else {
                    if (idx >= 0) document.title = document.title.substr(0, idx);
                }
                // TODO: 绑定作用域 ???
            }.bind(this));

            myDiagram.addDiagramListener("ChangedSelection", function () {

            }.bind(this));




            // 定义步骤（默认类型）节点的模板
            myDiagram.nodeTemplateMap.add("Process1",  // 默认类型
                $(go.Node, "Table", this.nodeStyle(),
                    // 步骤节点是一个包含可编辑文字块的长方形图块
                    $(go.Panel, "Auto",
                        $(go.Shape, "Rectangle",
                            { fill: "#00A9C9", strokeWidth: 0 },
                            new go.Binding("figure", "figure")
                        ),

                        $(go.TextBlock, this.textStyle(),
                            {
                                margin: 8,
                                maxSize: new go.Size(160, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: true,  // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay() // 双向绑定模型中"text"属性
                        ),
                    ),

                    // 上、左、右可以入，左、右、下可以出
                    // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                    this.makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
                    this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
                    this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
                )
            );

            // 定义开始节点的模板
            myDiagram.nodeTemplateMap.add("Start",
                $(go.Node, "Table", this.nodeStyle(),
                    // 开始节点是一个圆形图块，文字不可编辑
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            { minSize: new go.Size(40, 40), fill: "#79C900", strokeWidth: 0 }),
                        $(go.TextBlock, "Start", this.textStyle(),
                            new go.Binding("text"))
                    ),

                    // 左、右、下可以出，但都不可入
                    this.makePort("L", go.Spot.Left, go.Spot.Left, true, false),
                    this.makePort("R", go.Spot.Right, go.Spot.Right, true, false),
                    this.makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
                )
            );

            // 定义结束节点的模板
            myDiagram.nodeTemplateMap.add("End",
                $(go.Node, "Table", this.nodeStyle(),
                    // 结束节点是一个圆形图块，文字不可编辑
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            { minSize: new go.Size(40, 40),
                                fill: "#DC3C00",
                                strokeWidth: 0,
                            }
                        ),
                        $(go.TextBlock, "End", this.textStyle(),
                            new go.Binding("text"))
                    ),

                    // 上、左、右可以入，但都不可出
                    this.makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.Left, false, true),
                    this.makePort("R", go.Spot.Right, go.Spot.Right, false, true)
                )
            );

            // 定义流程节点模板
            myDiagram.nodeTemplateMap.add("Process",
                $(go.Node, "Auto", this.nodeStyle(),

                    {
                        click: function(e, obj) {
                            let nodeKey = obj.part.data.key;
                            self.currentNode = nodeKey;
                            console.log("Clicked on " + obj.part.data.key);
                        },
                        selectionChanged: function(part) {
                            var shape = part.elt(0);
                            shape.fill = part.isSelected ? "red" : "#409EFF";
                        }
                    },
                    $(go.Shape, "RoundedRectangle",
                        {
                            fill: "#409EFF",
                            stroke: "lightgray",
                        }
                    ),

                    $(go.Panel, "Table",
                        { defaultAlignment: go.Spot.Left, margin: 4 },
                        $(go.RowColumnDefinition, { column: 1, width: 4 }),
                        $(go.TextBlock, this.textStyle(),
                            {
                                row: 0, column: 0, columnSpan: 3, alignment: go.Spot.Center,
                                margin: 5,
                                maxSize: new go.Size(150, NaN),
                                // wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: true,  // 文字可编辑
                                contextMenu: $(go.Adornment, "Vertical", new go.Binding("itemArray", "commands"), {
                                    itemTemplate: $("ContextMenuButton",
                                        $(go.Shape, { figure: "RoundedRectangle", fill: "transparent", width: 40, height: 24, stroke: "gray", strokeWidth: 1, scale: 1.0, areaBackground: "transparent" }),
                                        $(go.TextBlock, { stroke: "deepskyblue", height: 24, width: 40, margin: 0, font: "bold 12px serif", textAlign: "center", verticalAlignment: go.Spot.Center }, new go.Binding("text")),
                                        {
                                            click: function(e, button) {
                                                if (myDiagram.isReadOnly) return;
                                                let cmd = button.data;
                                                console.log(button.part.adornedPart)
                                                let nodeData = button.part.adornedPart.data;

                                                let curNode = myDiagram.findNodeForKey(nodeData.key);
                                                // self.currentNode = myDiagram.findNodeForKey(nodeData.key);
                                                console.log('当前节点', nodeData)
                                                // options.contextMenu(curNode, cmd.text);
                                            }
                                        }
                                    )
                                })

                            },
                            new go.Binding("text", "key").makeTwoWay() // 双向绑定模型中"text"属性
                        ),

                        $(go.TextBlock, this.textStyle(),
                            {
                                row: 1, column: 0, columnSpan: 3, alignment: go.Spot.Center,
                                maxSize: new go.Size(150, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: true,  // 文字可编辑
                            },
                            new go.Binding("text", "text").makeTwoWay() // 双向绑定模型中"text"属性
                        )
                    ),
                    // $("TreeExpanderButton", {
                    //     alignment: go.Spot.Right,
                    //     alignmentFocus: go.Spot.Left,
                    //     "ButtonBorder.figure": "Rectangle"
                    // })
                )
            );

            myDiagram.groupTemplate =
                $(go.Group, "Auto",
                    { // define the group's internal layout
                        layout: $(go.TreeLayout,
                            { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false }),
                        // the group begins unexpanded;
                        // upon expansion, a Diagram Listener will generate contents for the group
                        isSubGraphExpanded: false,
                        // when a group is expanded, if it contains no parts, generate a subGraph inside of it
                        subGraphExpandedChanged: function(group) {
                            if (group.memberParts.count === 0) {
                                randomGroup(group.data.key);
                            }
                        }
                    },
                    $(go.Shape, "Rectangle",
                        { fill: null, stroke: "gray", strokeWidth: 2 }),
                    $(go.Panel, "Vertical",
                        { defaultAlignment: go.Spot.Left, margin: 4 },
                        $(go.Panel, "Horizontal",
                            { defaultAlignment: go.Spot.Top },
                            // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                            $("SubGraphExpanderButton"),
                            $(go.TextBlock,
                                { font: "Bold 18px Sans-Serif", margin: 4 },
                                new go.Binding("text", "key"))
                        ),
                        // 设置 go.Placeholder 对象的目的是, 让组自适应内部节点的大小;
                        $(go.Placeholder,
                            { padding: new go.Margin(0, 10) })
                    )  // end Vertical Panel
                );  // end Group


            // 初始化连接线的模板
            myDiagram.linkTemplate = $(go.Link,  // 所有连接线
                {
                    routing: go.Link.AvoidsNodes,   // 连接线避开节点
                    curve: go.Link.JumpOver,
                    corner: 5, toShortLength: 4,    // 直角弧度，箭头弧度
                    relinkableFrom: true,   // 允许连线头重设
                    relinkableTo: true,     // 允许连线尾重设
                    reshapable: true,       // 允许线形修改
                    resegmentable: true,    // 允许连线分割（折线）修改
                    // 鼠标移到连线上后高亮
                    mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
                    mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
                    selectionAdorned: false
                },
                new go.Binding("points").makeTwoWay(),  // 双向绑定模型中"points"数组属性
                $(go.Shape,  // 隐藏的连线形状，8个像素粗细，当鼠标移上后显示
                    { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }
                ),
                $(go.Shape,  // 连线规格（颜色，选中/非选中，粗细）
                    { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
                    new go.Binding("stroke", "isSelected", function (sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()
                ),
                $(go.Shape,  // 箭头规格
                    { toArrow: "standard", strokeWidth: 0, fill: "gray" }
                ),
                $(go.Panel, "Auto",  // 连线标签，默认不显示
                    { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
                    new go.Binding("visible", "visible").makeTwoWay(),  // 双向绑定模型中"visible"属性
                    $(go.Shape, "RoundedRectangle",  // 连线中显示的标签形状
                        { fill: "#F8F8F8", strokeWidth: 0 }),
                    $(go.TextBlock, "是",  // 连线中显示的默认标签文字
                        {
                            textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: "#333333",
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay())  // 双向绑定模型中"text"属性
                )
            );
            // 临时的连线（还在画图中），包括重连的连线，都保持直角
            myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
            myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;


            // 在图形页面的左边初始化图例Palette面板
            $(go.Palette, "diagramPannel",  // 必须同HTML中Div元素id一致
                {
                    scrollsPageOnFocus: false,  // 图选中时页面不会滚动
                    nodeTemplateMap: myDiagram.nodeTemplateMap,  // 同myDiagram公用一种node节点模板
                    model: new go.GraphLinksModel([  // 初始化Palette面板里的内容
                        { category: "Start", text: "开始" },
                        {
                            category: 'Process',
                            key: '1',
                            text: "流程",
                            fill: "#FEF7E7",
                            stroke: '#FDCF90',
                            commands: [{ text: "查看", action: "view" }, { text: "删除", action: "view" }],
                        },

                        { category: "End", text: "结束" },
                    ])
                }
            );

            // 初始化模型范例
            // myDiagram.model = go.Model.fromJson(
            //     {
            //         "class": "go.GraphLinksModel",
            //         "linkFromPortIdProperty": "fromPort",
            //         "linkToPortIdProperty": "toPort",
            //         "nodeDataArray": [
            //             { "category": "Start", "text": "开始", "key": 1, "loc": "88 37" },
            //             { "category": "Process", "text": "拆车轮", "key": 2, "loc": "88 114" },
            //             { "category": "Process", "text": "拆车灯", "key": 3, "loc": "88 210" },
            //             { "category": "Process", "text": "放下工具", "key": 4, "loc": "87 307" },
            //             { "category": "Process", "text": "放下工具", "key": 5, "loc": "87 375" },
            //             { "category": "End", "text": "结束", "key": 6, "loc": "87 445" }
            //         ],
            //         "linkDataArray": [
            //             { "from": 2, "to": 3, "fromPort": "B", "toPort": "T" },
            //             { "from": 1, "to": 2, "fromPort": "B", "toPort": "T" },
            //             { "from": 3, "to": 4, "fromPort": "B", "toPort": "T" },
            //             { "from": 4, "to": 5, "fromPort": "B", "toPort": "T" },
            //             { "from": 5, "to": 6, "fromPort": "B", "toPort": "T" }
            //         ]
            //     }
            // );
            // this.editorVal = myDiagram.model.toJson()
        },

        // 此事件方法由整个画板的LinkDrawn和LinkRelinked事件触发
        // 如果连线是从”conditional"条件节点出发，则将连线上的标签显示出来
        showLinkLabel(e) {
            let label = e.subject.findObject("LABEL");
            if (label !== null) {
                label.visible = (e.subject.fromNode.data.category === "Conditional");
            }
        },

        // 设置节点位置风格，并与模型"loc"属性绑定，该方法会在初始化各种节点模板时使用
        nodeStyle() {
            return [
                // 将节点位置信息 Node.location 同节点模型数据中 "loc" 属性绑定：
                // 节点位置信息从 节点模型 "loc" 属性获取, 并由静态方法 Point.parse 解析.
                // 如果节点位置改变了, 会自动更新节点模型中"loc"属性, 并由 Point.stringify 方法转化为字符串
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                {
                    // 节点位置 Node.location 定位在节点的中心
                    locationSpot: go.Spot.Center
                }

            ];
        },

        // 创建"port"方法，"port"是一个透明的长方形细长图块，在每个节点的四个边界上，如果鼠标移到节点某个边界上，它会高亮
        // "name": "port" ID，即GraphObject.portId,
        // "align": 决定"port" 属于节点4条边的哪条
        // "spot": 控制连线连入/连出的位置，如go.Spot.Top指, go.Spot.TopSide
        // "output" / "input": 布尔型，指定是否允许连线从此"port"连入或连出
        makePort(name, align, spot, output, input) {
            // 如果是上、下边界，则是水平"port"
            var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);

            return $(go.Shape,
            {
                fill: "transparent",            // 默认透明不现实
                strokeWidth: 0,                 // 无边框
                width: horizontal ? NaN : 8,    // 垂直"port"则8像素宽
                height: !horizontal ? NaN : 8,  // 水平"port"则8像素
                alignment: align,               // 同其节点对齐
                stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical), // 自动同其节点一同伸缩
                portId: name,                   // 声明ID
                fromSpot: spot,                 // 声明连线头连出此"port"的位置
                fromLinkable: output,           // 布尔型，是否允许连线从此"port"连出
                toSpot: spot,                   // 声明连线尾连入此"port"的位置
                toLinkable: input,              // 布尔型，是否允许连线从此"port"连出
                cursor: "pointer",              // 鼠标由指针改为手指，表示此处可点击生成连线
                mouseEnter: function (e, port) { // 鼠标移到"port"位置后，高亮
                    if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
                },
                mouseLeave: function (e, port) { // 鼠标移出"port"位置后，透明
                    port.fill = "transparent";
                }
            });
        },

        // 图形上的文字风格
        textStyle() {
            return {
                font: "11pt Helvetica, Arial, sans-serif",
                stroke: "#fff",
                textAlign: "center",
            }
        },

        // xml 导入
        loadJsonFile(file, fileList) {
            let self = this;
            this.fileList = fileList;
            console.log(this.fileList)
            if (fileList) {
                for (let i = 0; i < fileList.length; i++) {
                    let file = fileList[i]
                    if (!file) continue
                    PromiseFileList.push(this.asyncReadFile(file));
                }
                //  TODO:读取多文件 start
                Promise.all(PromiseFileList).then(res => {
                    // 文件列表去重
                    let obj = {};
                    fileDataArr = res.reduce(function (item, next) {
                        obj[next.name] ? '' : obj[next.name] = true && item.push(next);
                        return item;
                    }, []);
                    // console.log('Promise then1', fileDataArr)
                    self.personOptions = fileDataArr.map(item => {
                        if (/(AssembledConfig_)\d+/g.test(item.name)) {
                            let id = item.name.match(/(?<=AssembledConfig_)\d+/g)[0];
                            return {
                                name: `人员${id}`,
                                id: id
                            }
                        }
                    }).filter(item => item)
                    // console.log(self.personOptions)
                    // self.json2Tree()
                    // this.hasData = true
                }, err => {
                    this.$alert(err)
                })


                // TODO:读取多文件 end

            }
        },

        async asyncReadFile(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.onload = function (e) {
                    let content = e.target.result;
                    //读取xml并转为tree
                    let jsonObj = xml2Json(content);
                    let result = {name: file.name, json: jsonObj}
                    if (/(AssembledConfig_)\d+/g.test(file.name)) {
                        let PersonID = file.name.match(/(?<=AssembledConfig_)\d+/g)[0];
                        result.personId = PersonID
                    }
                    resolve(result)
                }
                reader.onerror = function (error) {
                    reject(error);
                }
                reader.readAsText(file.raw)
            })
        },


        json2Tree() {
            for (let i = 0; i < fileDataArr.length; i++) {
                let file = fileDataArr[i] ? fileDataArr[i] : ''
                if (!file) continue
                let impFileName = file.name; // 导入文件名称
                if (/(AssembledConfig_)\d+/g.test(impFileName)) {
                    // 人员信息
                    // TODO: 获取当前导入文件的人员ID
                    this.currentPerson = impFileName.match(/(?<=AssembledConfig_)\d+/g)[0];
                    this.personParseData(file.json, i)
                    this.hasData = true;
                } else {
                    // 流程信息
                    // processData = file.json;
                    this.processParseData(file.json)
                    this.processTplName = impFileName
                }
            }

        },

        // 流程信息数据 解析
        processParseData(json) {
            console.log('流程信息', json);
            //xml转换为json后，当只有一个元素时，格式为对象，非对象数组，强制将它们转为对象数组，以便使用forEach

            this.processJson._ID = json.ProcessConfigure._ID;
            this.processJson._Name = json.ProcessConfigure._Name;
            // 节点组
            if(json.ProcessConfigure.BigProcessConfigure) {
                let BigProcessConfigure = json.ProcessConfigure.BigProcessConfigure; // 大流程 => 流程图中的组
                let BigProcessInfo = forceArr(BigProcessConfigure.BigProcessInfo)

                // _Index: "1", _ProcessSection: "1,1-1,1-2", _Name: "拆前置喷头"
            }

            // 基础节点
            let nodeDataArray = []  // 节点
            let linkDataArray = [] // 链接

            if(json.ProcessConfigure.ProcessInfo) {
                let ProcessInfo = json.ProcessConfigure.ProcessInfo; // 流程节点信息
                ProcessInfo = forceArr(ProcessInfo);

                let start = { category: "Start", text: "开始", key: 'start', loc: "88 37" };
                nodeDataArray.push(start);
                // 添加开始节点link
                let startKey = ProcessInfo[0]._Index
                linkDataArray.push({ from: 'start', to: startKey, fromPort: "B", toPort: "T" })
                ProcessInfo.forEach((item, index) => {
                    let node = {
                        category: "Process",
                        text: item._Name,
                        key: item._Index,
                        loc: `88 ${37 + 80 * (index + 1)}`,
                        commands: [{ text: "查看", action: "view" }, { text: "删除", action: "view" }]
                    };
                    nodeDataArray.push(node);
                    item.ProcessBranch = item.ProcessBranch ? forceArr(item.ProcessBranch) : []
                    // console.log( item.ProcessBranch)
                    if (item.ProcessBranch.length > 0) {
                        item.ProcessBranch.forEach(branch => {
                            let link =  { from: item._Index, to: branch._Index, fromPort: "B", toPort: "T" }
                            linkDataArray.push(link)
                        })
                    }
                })

                let end = { category: "End", text: "结束", key: 'end', loc: `88 ${37 + 80 * (ProcessInfo.length + 1) }` };
                nodeDataArray.push(end);

                let endKey = ProcessInfo.slice(-1)[0]._Index
                // 添加结束节点link
                linkDataArray.push({ from: endKey, to: 'end', fromPort: "B", toPort: "T" })
                // console.log(nodeDataArray)
                // console.log(linkDataArray)

                myDiagram.model = go.Model.fromJson(
                    {
                        nodeDataArray,
                        linkDataArray
                    }
                )
                // 转json
                // this.editorVal = myDiagram.model.toJson()
            }

        },

        // 人员信息数据 解析
        personParseData(json, i) {
                //xml转换为json后，当只有一个元素时，格式为对象，forceArr 非对象数组，强制将它们转为对象数组，以便使用forEach
            this.currentPersonJson = json.ProcessConfigure;
        },

        exportFile(type) {
            if (type === 1) {
                // 流程导出
                this.exportProceeXML();
            } else {
                // 人员信息导出
                this.exportPersonXML();
            }
        },

        // 人员信息导出
        exportPersonXML() {
            this.editorVal = myDiagram.model.toJson()
            let { nodeDataArray, linkDataArray } = this.editorVal
            // TODO: XML 模板修改
            let xmlDoc = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
                '<ToolsConfigure' + ' ToolMode="' + this.ToolMode + '">\r\n' +
                '  <ToolPartsList>\r\n';
            // tmp

            // 人员信息模板



            let currTime = getCurrTime();
            let xmlfile = 'AssembledConfig_' + this.currentPerson + currTime + '.xml';
            this.exportData(xmlDoc, xmlfile);
        },

        // 流程信息导出
        exportProceeXML () {
            this.editorVal = myDiagram.model.toJson()
            let { nodeDataArray, linkDataArray } = this.editorVal
            let xmlDoc = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
                '<ProcessConfigure' + ' ID="' + this.ToolMode + '"' + 'Name="' +  +'">\r\n' +
                '  <ProcessConfigure>\r\n';
            // tmp

            // <ProcessInfo Index="3" Name="前臂左侧螺丝" BackIndex="">
            //     <ProcessBranch Index="3-1"/>
            // </ProcessInfo>
            // nodeDataArray.


            let currTime = getCurrTime();
            let xmlFile = '';
            if (impFileName != '') {
                let len = impFileName.length;
                xmlfile = impFileName.substring(0, len - 4) + '_' + currTime + '.xml';
            } else {
                xmlfile = 'ProcessConfig_' + currTime + '.xml';
            }

            this.exportData(xmlDoc, xmlfile);

        },

        //导出文件
        //doc为拼接好的字符串，file为文件名
        exportData(doc, file) {
            var blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
            saveAs(blob, file);
        },
    }
}
