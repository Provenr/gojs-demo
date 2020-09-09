let myDiagram = null;
const $ = go.GraphObject.make;    // 创建画布

let processData = '' // 流程数据
let processTmpJson = {
    ProcessConfigure: {
        BigProcessConfigure: {},
        ProcessInfo: [
            // {
            //     ProcessBranch: [{_Index: "1-1"}],
            //     _BackIndex: "",
            //     _Index: "",
            //     _Name: ""
            // }
        ],
        _ID: "",
        _Name: ""
    }
} // 流程模板数据

let nodeDataArray = []  // 节点
let linkDataArray = [] // 链接
//
function setPersonNodeTmpJson (id, name) {
    return {
        EndEventInfo: {
            EventList: {
                Event:[
                    // {_Content: ""}
                ]
            },
            _AnimaIndex: name,
            _ColliderMode: "",
            _ColliderScale: "",
            _Index: "3",
            _MaskColliderObject: "null",
            _NextDelay: "3",
            _ObjectName: "",
            _ObjectType: "",
            _OperationPerson: "1",
            _ShowMode: "dotween",
            _ShowModeTime: "0",
            _TriggerMode: "0",
            _TriggerObject: ""
        },
        StartEventInfo: {
            EventList: {
                Event:[
                    // {_Content: ""}
                ]
            },
            _AnimaIndex: name,
            _ColliderMode: "",
            _ColliderScale: "",
            _Index: "1",
            _MaskColliderObject: "null",
            _NextDelay: "3",
            _ObjectName: "",
            _ObjectType: "",
            _OperationPerson: "1",
            _ShowMode: "dotween",
            _ShowModeTime: "0",
            _TriggerMode: "0",
            _TriggerObject: ""
        },
        StepEventInfo: {
            EventList: {
                Event:[
                    // {_Content: ""}
                ]
            },
            _AnimaIndex: name,
            _ColliderMode: "",
            _ColliderScale: "",
            _Index: "2",
            _MaskColliderObject: "null",
            _NextDelay: "3",
            _ObjectName: "",
            _ObjectType: "",
            _OperationPerson: "1",
            _ShowMode: "dotween",
            _ShowModeTime: "0",
            _TriggerMode: "0",
            _TriggerObject: ""
        },
        _AutoPlay: "1",
        _Index: id,
        _Name: name
    }
}
let personTmpJson = { // 人员模板数据
    ProcessConfigure: {
        ProcessInfo: [
            {
                EndEventInfo: {
                    EventList: {
                        Event:[
                            // {_Content: ""}
                        ]
                    },
                    _AnimaIndex: "",
                    _ColliderMode: "",
                    _ColliderScale: "",
                    _Index: "",
                    _MaskColliderObject: "null",
                    _NextDelay: "3",
                    _ObjectName: "",
                    _ObjectType: "",
                    _OperationPerson: "1",
                    _ShowMode: "dotween",
                    _ShowModeTime: "0",
                    _TriggerMode: "0",
                    _TriggerObject: ""
                },
                StartEventInfo: {
                    EventList: {
                        Event:[
                            // {_Content: ""}
                        ]
                    },
                    _AnimaIndex: "",
                    _ColliderMode: "",
                    _ColliderScale: "",
                    _Index: "",
                    _MaskColliderObject: "null",
                    _NextDelay: "3",
                    _ObjectName: "",
                    _ObjectType: "",
                    _OperationPerson: "1",
                    _ShowMode: "dotween",
                    _ShowModeTime: "0",
                    _TriggerMode: "0",
                    _TriggerObject: ""
                },
                StepEventInfo: {
                    EventList: {
                        Event:[
                            // {_Content: ""}
                        ]
                    },
                    _AnimaIndex: "",
                    _ColliderMode: "",
                    _ColliderScale: "",
                    _Index: "",
                    _MaskColliderObject: "null",
                    _NextDelay: "3",
                    _ObjectName: "",
                    _ObjectType: "",
                    _OperationPerson: "1",
                    _ShowMode: "dotween",
                    _ShowModeTime: "0",
                    _TriggerMode: "0",
                    _TriggerObject: ""
                },
                _TEST: 'Template',
                _AutoPlay: "",
                _Index: "",
                _Name: ""
            }
        ],
        _AssembleModel: "",
        _Name: "",
        _PersonNumber: ""
    }
}

let PromiseFileList = [] // 读取的文件
let fileDataArr = [] // 读取的文件列表
let fileDataXML = [] // 导出文件列表

function completionZero(num, length) {
    for(let len = (num + "").length; len < length; len = num.length) {
        num = "0" + num;
    }
    return num;
}

//播放类型选项
let loopTypeOptions = [{
    code: '1',
    text: '是'
}, {
    code: '2',
    text: '否'
}];


// 工具类型选项
let ToolListOptions = [];

const Editor = {
    data() {
        return {
            editorVal: {nodeDataArray: []}, // 可视化编辑的内容
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
            currentPersonJson: {
                _Name: '',
                _PersonNumber: '',
                _AssembleModel: '',
                ProcessInfo: {}
            },
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
            console.log('this.currentPersonJson',this.currentPersonJson)
            let newPersonJson = null;
            let oldPersonJson = JSON.parse(JSON.stringify(this.currentPersonJson));
            this.currentPersonJson = {};
            // this.currentNode = ''; // 人员改变 清空当前节点
            // console.log(`old${this.oldPerson}`, oldPersonJson)
            // FIXME: 可能需要深拷贝
            fileDataArr.forEach(item => {
                if (item.personId && item.personId === this.oldPerson) {
                    item.json.ProcessConfigure = oldPersonJson;
                }
                if (item.personId && item.personId === newData) {
                    newPersonJson = JSON.parse(JSON.stringify(item.json));
                }
            })
            // console.log(`new${newData}`, newPersonJson.ProcessConfigure)
            this.personParseData(newPersonJson, newData);
            this.setAutoPlay()
        },
        currentNode(newNode, oldNode) {
            // console.log('currentNode',newNode, oldNode)
            if (newNode === null) {
                return false;
            }
            if (!this.currentPersonJson.ProcessInfo) {
                return false;
            }
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
            // console.log(this.currentNodeIndex)
            this.setAutoPlay()
        },
        'currentPersonJson._Name'(newVal, oldVal) {
            this.twoWayBindPerson(fileDataArr, this.currentPerson, '_Name', newVal)
            // for (let i = 0; i < fileDataArr.length; i++) {
            //     let file = fileDataArr[i] ? fileDataArr[i] : ''
            //     if (!file) continue
            //     let impFileName = file.name; // 文件名称
            //     if (/(AssembledConfig_)\d+/g.test(impFileName)) {
            //         if(impFileName.match(/(?<=AssembledConfig_)\d+/g)[0] == this.currentPerson){
            //             fileDataArr[i].json.ProcessConfigure._AssembleModel = newVal
            //         }
            //     }
            // }
        },
        'currentPersonJson._PersonNumber'(newVal, oldVal) {
            this.twoWayBindPerson(fileDataArr, this.currentPerson, '_PersonNumber', newVal)
        },
        'currentPersonJson._AssembleModel'(newVal, oldVal) {
            this.twoWayBindPerson(fileDataArr, this.currentPerson, '_AssembleModel', newVal)
        },

    },
    mounted() {
        this.initDiagram()
    },
    methods: {

        twoWayBindPerson(fileDataArr, currentPerson, updateKey, updateValue) {
            for (let i = 0; i < fileDataArr.length; i++) {
                let file = fileDataArr[i] ? fileDataArr[i] : ''
                if (!file) continue
                let impFileName = file.name; // 文件名称
                if (/(AssembledConfig_)\d+/g.test(impFileName)) {
                    if(impFileName.match(/(?<=AssembledConfig_)\d+/g)[0] == currentPerson){
                        fileDataArr[i].json.ProcessConfigure[updateKey] = updateValue
                    }
                }
            }
        },

        AddPerson() {
            let personId = 0; // 默认从一开始
            let toolConfig = false; // 默认不存在工具配置文件
            let processConfig = false; // 默认不存在流程配置文件
            let processJson = null;
            // 1. 获取人员ID 最大值 ,在此基础上 新增人员文件
            // 2. 判断 是否存在 工具配置文件
            // 3. 判断是否存在流程文件
            for (let i = 0; i < fileDataArr.length; i++) {
                let file = fileDataArr[i] ? fileDataArr[i] : ''
                if (!file) continue
                let impFileName = file.name; // 文件名称
                if (/(AssembledConfig_)\d+/g.test(impFileName)) {
                    // 人员信息
                    // 获取最大的人员ID
                    personId = Math.max(impFileName.match(/(?<=AssembledConfig_)\d+/g)[0], personId)
                    // this.personParseData(file.json, i)
                    // // 获取已存在的人员配置 💺模板
                    // processTmpJson = file.json
                    // this.hasData = true;
                } else if (/ToolsConfig/g.test(impFileName)) {
                    toolConfig = true;
                } else if (/ProcessConfig/g.test(impFileName)) {
                    // 流程信息
                    processConfig = true;
                    processJson = file.json
                }
            }
            if (!toolConfig) { // 不存在工具配置, 直接退出
                this.$alert('请导入工具配置信息');
                return false;
            }
            if (!processConfig) { // 不存在流程配置, 创建一个空流程配置
                fileDataArr.push({name: 'ProcessConfig.xml', json: processTmpJson})
                fileDataArr.push({name: `AssembledConfig_${personId + 1}.xml`, json: personTmpJson, personId: `${personId + 1}`})
            } else {
                let personJson = JSON.parse(JSON.stringify(personTmpJson.ProcessConfigure));
                personJson.ProcessInfo = [];
                // 存在流程配置, 根据流程节点添加人员节点
                if(processJson.ProcessConfigure.ProcessInfo.length > 0) {
                    let ProcessInfo = processJson.ProcessConfigure.ProcessInfo; // 流程节点信息
                    ProcessInfo = forceArr(ProcessInfo);
                    if (ProcessInfo.length > 0) {
                        ProcessInfo.forEach((item, index) => {
                            personJson.ProcessInfo.push(setPersonNodeTmpJson(item._Index, item._Name))
                        })
                    } else {
                        let obj = setPersonNodeTmpJson('', '');
                        obj._TEST = 'Template';
                        personJson.ProcessInfo.push(obj)
                    }

                }
                fileDataArr.push({name: `AssembledConfig_${personId + 1}.xml`, json: {ProcessConfigure: personJson}, personId: `${personId + 1}`})
            }

            // 下拉框
            this.personOptions.push({
                name: `人员${personId + 1}`,
                id: `${personId + 1}`
            })

            this.json2Tree();
            // TODO: 设置为新增人员
            // this.currentPerson = personId + 1; // 设置当前人员
        },

        // 设置当前节点的执行方式
        setAutoPlay() {
            if (this.currentPersonJson.ProcessInfo.length == 0) return false;
            if (this.currentPersonJson.ProcessInfo[this.currentNodeIndex]._AutoPlay != '1'
            && this.currentPersonJson.ProcessInfo[this.currentNodeIndex]._AutoPlay != '2') {
                this.currentPersonJson.ProcessInfo[this.currentNodeIndex]._AutoPlay = '2'
            }
        },
        // 初始化
        initDiagram() {
            let self = this;
            myDiagram = $(go.Diagram, "diagramEditor",   // 必须与Div元素的id属性一致
                {
                    initialContentAlignment: go.Spot.Center, // 居中显示内容
                    "undoManager.isEnabled": true, // 启用Ctrl-Z和Ctrl-Y撤销重做功能
                    allowDrop: true,  // 是否允许从Palette面板拖入元素
                    "LinkDrawn": this.showLinkLabel,  // 每次画线后调用的事件：为条件连线加上标签，该方法后面定义
                    "LinkRelinked": this.showLinkLabel,  // 每次重画线后调用的事件：同上LinkDrawn
                    scrollsPageOnFocus: false,   // 图选中时页面不会滚动
                    // "ModelChanged": function(e) {
                    //     if (e.isTransactionFinished) {
                    //         console.log(e.model.modelData)
                    //         // TODO: 判断节点是否存
                    //         // findNodeDataForKey
                    //         self.$alert('该节点KEY已存在')
                    //     }
                    // }
                }
            );

            // This is the actual HTML context menu:
            let cxElement = document.getElementById("contextMenu");
            //
            // // allow the group command to execute
            myDiagram.commandHandler.archetypeGroupData =
                { key: '1', isGroup: true, text: '组名称', color: "blue" };
            // // modify the default group template to allow ungrouping
            myDiagram.groupTemplate.ungroupable = true;

            // enable or disable a particular button
            function enable(name, ok) {
                let button = document.getElementById(name);
                if (button) button.disabled = !ok;
            }

            /**
             * desc: enable or disable all command buttons
             * link : https://github.com/NorthwoodsSoftware/GoJS/blob/master/extensions/LightBoxContextMenu.js
             */
            function enableAll() {
                let cmdhnd = myDiagram.commandHandler;
                enable("SelectAll", cmdhnd.canSelectAll());
                enable("Cut", cmdhnd.canCutSelection());
                enable("Copy", cmdhnd.canCopySelection());
                enable("Paste", cmdhnd.canPasteSelection());
                enable("Delete", cmdhnd.canDeleteSelection());
                enable("Group", cmdhnd.canGroupSelection());
                enable("Ungroup", cmdhnd.canUngroupSelection());
                enable("Undo", cmdhnd.canUndo());
                enable("Redo", cmdhnd.canRedo());
                // enable("ZoomToFit", cmdhnd.canZoomToFit());
            }

            // 事件监听
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
                enableAll();
                // console.log('ChangedSelection')
            }.bind(this));

            // 从Palette拖过来节触发的事件
            // myDiagram.addDiagramListener("externalobjectsdropped", function(e) {
            //     e.subject.each(function(n){
            //         // 获取当前 人员配置文件
            //         let currentPersonJson = '';
            //         fileDataArr.forEach(item => {
            //               if(item.personId === self.currentPerson) {
            //                   currentPersonJson = item.json
            //               }
            //         })
            //         currentPersonJson.ProcessConfigure
            //         // 当前节点 key
            //         console.log(n.data);
            //         console.log(nodeDataArray)
            //     });
            // })

            myDiagram.addModelChangedListener(function(evt) {
                if (!evt.isTransactionFinished){
                    return;
                }else{
                    var txn = evt.object; //获取事务
                    if (txn === null) return;
                    txn.changes.each(function(e) {//遍历事务
                        if (e.change === go.ChangedEvent.Insert && e.propertyName === "nodeDataArray") {//节点新增 不包含连线
                            // console.log(evt.propertyName , "** added *****************88",e.newValue);
                            // self.AddPerson();
                            let personFlag = false;
                            for (let i = 0; i < fileDataArr.length; i++) {
                                let file = fileDataArr[i] ? fileDataArr[i] : ''
                                if (!file) continue
                                let impFileName = file.name; // 导入文件名称
                                if (/(AssembledConfig_)\d+/g.test(impFileName)) {
                                    personFlag = true;
                                }
                            }

                            // 人员信息配置文件存在时  排除组节点
                            if (personFlag && !e.newValue.isGroup) {
                                self.updatePersonData('add', e.newValue)
                            }

                        } else if (e.change === go.ChangedEvent.Remove && e.propertyName === "nodeDataArray") {
                            // console.log(evt.propertyName , "******* delete ***********",e.oldValue);
                            self.updatePersonData('delete', e.oldValue)
                            // FIXME: currentnode 重置
                            this.currentNode = null;
                            this.hasData = false;

                        }else if (e.change === go.ChangedEvent.Property && e.propertyName=="text") {
                            // console.log("e.oldValue:"+e.oldValue+"***"+"*****e.newValue:"+e.newValue);
                        }
                    });
                }
            });
            // myDiagram.model.updateTargetBindings(node.data)

            // 定义右键菜单
            myDiagram.contextMenu =
                $("ContextMenu",
                    $("ContextMenuButton",
                        $(go.TextBlock, goBaseConfig.ContextMenuTextStyle(), "撤销"),
                        { click: function(e, obj) { e.diagram.commandHandler.undo(); } },
                        new go.Binding("visible", "", function(o) {
                            return o.diagram.commandHandler.canUndo();
                        }).ofObject()),
                    $("ContextMenuButton",
                        $(go.TextBlock, goBaseConfig.ContextMenuTextStyle(),"恢复"),
                        { click: function(e, obj) { e.diagram.commandHandler.redo(); } },
                        new go.Binding("visible", "", function(o) {
                            return o.diagram.commandHandler.canRedo();
                        }).ofObject()),
                    $("ContextMenuButton",
                        $(go.TextBlock, goBaseConfig.ContextMenuTextStyle(), "打组"),
                        { click: function(e, obj) {
                            self.$alert('请设置组索引');
                            e.diagram.commandHandler.groupSelection();
                        }},
                        new go.Binding("visible", "", function(o) {
                            return o.diagram.commandHandler.canGroupSelection();
                        }).ofObject()),
                    $("ContextMenuButton",
                        $(go.TextBlock, goBaseConfig.ContextMenuTextStyle(), "取消打组"),
                        { click: function(e, obj) {
                            e.diagram.commandHandler.ungroupSelection();
                        }},
                        new go.Binding("visible", "", function(o) {
                            return o.diagram.commandHandler.canUngroupSelection();
                        }).ofObject()),
                    // no binding, always visible button:
                    // $("ContextMenuButton",
                    //     $(go.TextBlock, goBaseConfig.ContextMenuTextStyle(), "新建节点"),
                    //     { click: function(e, obj) {
                    //             e.diagram.commit(function(d) {
                    //                 // get the context menu that holds the button that was clicked
                    //                 var contextmenu = obj.part;
                    //                 // get the node data to which the Node is data bound
                    //                 var nodedata = contextmenu.data;
                    //                 var data = {
                    //                     category: 'Process',
                    //                     key: 0,
                    //                     text: "流程",
                    //                     fill: "#FEF7E7",
                    //                     stroke: '#FDCF90'
                    //                 };
                    //                 d.model.addNodeData(data);
                    //                 part = d.findPartForData(data);  // must be same data reference, not a new {}
                    //                 // set location to saved mouseDownPoint in ContextMenuTool
                    //                 part.location = d.toolManager.contextMenuTool.mouseDownPoint;
                    //             }, 'new node');
                    //         } })
                );


            // 定义开始节点的模板
            myDiagram.nodeTemplateMap.add("Start",
                $(go.Node, "Table", this.nodeStyle(),
                    // 开始节点是一个圆形图块，文字不可编辑
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            { minSize: new go.Size(60, 60), fill: "#79C900", strokeWidth: 0 }),
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
                $(go.Node, "Table", this.nodeStyle(),
                    {
                        click: function(e, obj) {
                            let nodeKey = obj.part.data.key;
                            self.currentNode = nodeKey;
                            // console.log("Clicked on " + obj.part.data.key);
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
                            minSize: new go.Size(60, 60)
                        }
                    ),

                    $(go.Panel, "Table",
                        { defaultAlignment: go.Spot.Left, margin: 4 , minSize: new go.Size(60, 60)},
                        $(go.RowColumnDefinition, { column: 1, width: 4 }),
                        $(go.TextBlock, this.textStyle(),
                            {
                                row: 0, column: 0, alignment: go.Spot.Center,
                                margin: 5,
                                maxSize: new go.Size(60, 200),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: true,  // 文字可编辑
                                // contextMenu: $(go.Adornment, "Vertical", new go.Binding("itemArray", 'cammands'), {
                                //     itemTemplate: $("ContextMenuButton",
                                //         $(go.Shape, { figure: "RoundedRectangle", fill: "transparent", width: 40, height: 24, stroke: "gray", strokeWidth: 1, scale: 1.0, areaBackground: "transparent" }),
                                //         $(go.TextBlock, { stroke: "deepskyblue", height: 24, width: 40, margin: 5, font: "bold 12px serif", textAlign: "center", verticalAlignment: go.Spot.Center }, new go.Binding("text")),
                                //         {
                                //             click: function(e, button) {
                                //                 if (myDiagram.isReadOnly) return;
                                //                 let cmd = button.data;
                                //                 console.log(button.part.adornedPart)
                                //                 let nodeData = button.part.adornedPart.data;
                                //
                                //                 let curNode = myDiagram.findNodeForKey(nodeData.key);
                                //                 // self.currentNode = myDiagram.findNodeForKey(nodeData.key);
                                //                 console.log('当前节点', nodeData)
                                //                 // options.contextMenu(curNode, cmd.text);
                                //             }
                                //         }
                                //     )
                                // })
                                textValidation: function(textBlock, previousText, currentText) {
                                    console.log(textBlock,textBlock.part.data);
                                    let nodeData = textBlock.part.data;
                                    if (currentText === previousText) { // 未修改
                                        return true
                                    }

                                    let nodeArr = nodeDataArray.filter(item => {
                                        return item.key === currentText
                                    })

                                    // 修改人员信息的 key
                                    self.changePersonText(nodeData, currentText, 'key')

                                    // console.log('findNodeDataForKey',myDiagram.model.findNodeDataForKey(currentText))
                                    textBlock.part.data.key = previousText;
                                    if (!nodeArr.length) {
                                        return true
                                    } else {
                                        self.$notify({
                                            title: '提示',
                                            type: 'warning',
                                            // position: 'top-left',
                                            message: '该索引已存在,请重新设置',
                                            // duration: 0
                                        });
                                        return false
                                    }
                                }
                            },
                            new go.Binding("text", "key").makeTwoWay() // 双向绑定模型中"text"属性
                        ),

                        $(go.TextBlock, this.textStyle(),
                            {
                                row: 1, column: 0, alignment: go.Spot.Center,
                                maxSize: new go.Size(100, 200),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: true,  // 文字可编辑
                                textValidation: function(textBlock, previousText, currentText) {
                                    console.log(textBlock,textBlock.part.data);
                                    let nodeData = textBlock.part.data;
                                    if (currentText.trim() === previousText.trim()) { // 未修改
                                        return true
                                    }
                                    // 修改人员信息的 key
                                    self.changePersonText(nodeData, currentText, 'text')
                                    return true
                                }
                            },
                            new go.Binding("text", "text").makeTwoWay() // 双向绑定模型中"text"属性
                        )
                    ),
                    // 树形展开按钮
                    // $("TreeExpanderButton", {
                    //     alignment: go.Spot.Right,
                    //     alignmentFocus: go.Spot.Left,
                    //     "ButtonBorder.figure": "Rectangle"
                    // })
                    // 上、左、右可以入，左、右、下可以出
                    // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                    this.makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
                    this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
                    this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
                    this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
                )
            );

            myDiagram.groupTemplate =
                $(go.Group, "Vertical",
                    {
                        selectionObjectName: "PANEL",  // selection handle goes around shape, not label
                        ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
                        computesBoundsAfterDrag: true,
                        layout:$(go.GridLayout,
                            {
                                wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                            })
                    },
                    $(go.Panel, go.Panel.Horizontal, // title above Placeholder
                        // $(go.Panel, go.Panel.Horizontal,  // button next to TextBlock
                            { stretch: go.GraphObject.Horizontal, background: "#33D3E5"},
                            $(go.TextBlock,
                                {
                                    alignment: go.Spot.Left,
                                    minSize: new go.Size(50, NaN),
                                    editable: true,
                                    textValidation: function(textBlock, previousText, currentText) {
                                        // console.log(textBlock,textBlock.part.data);
                                        if (currentText === previousText) { // 未修改
                                            return true
                                        }
                                        let nodeArr = nodeDataArray.filter(item => {
                                            return item.key === currentText
                                        })
                                        // console.log('findNodeDataForKey',myDiagram.model.findNodeDataForKey(currentText))
                                        if (!nodeArr.length) {
                                            return true
                                        } else {
                                            self.$notify({
                                                title: '提示',
                                                type: 'warning',
                                                // position: 'top-left',
                                                message: '该索引已存在,请重新设置',
                                            });
                                            return false
                                        }
                                    },
                                    margin: 5,
                                    font: "bold 16px sans-serif",
                                    stroke: "#006080"
                                },
                                new go.Binding("text", "key").makeTwoWay()
                            ),
                            $(go.TextBlock,
                                {
                                    alignment: go.Spot.Right,
                                    editable: true,
                                    margin: 5,
                                    font: "bold 16px sans-serif",
                                    stroke: "#006080"
                                },
                                new go.Binding("text", "text").makeTwoWay()
                            ),
                        // ),
                    ),
                    $(go.Panel, "Auto",
                        { name: "PANEL" },
                        $(go.Shape, "Rectangle",  // the rectangular shape around the members
                            {
                                fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 2,
                                portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
                                // allow all kinds of links from and to this port
                                // fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                                // toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                            }),
                        $(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
                    ),
                    // { // this tooltip Adornment is shared by all groups
                    //     toolTip:
                    //         $("ToolTip",
                    //             $(go.TextBlock, { margin: 4 },
                    //                 // bind to tooltip, not to Group.data, to allow access to Group properties
                    //                 new go.Binding("text", "", groupInfo).ofObject())
                    //         ),
                    //     // the same context menu Adornment is shared by all groups
                    //     contextMenu: partContextMenu
                    // }
                );


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
                            key: '0-1',
                            text: "流程",
                            fill: "#FEF7E7",
                            stroke: '#FDCF90',
                            // commands: [{ text: "查看", action: "view" }, { text: "删除", action: "view" }],
                        },

                        { category: "End", text: "结束" },
                    ])
                }
            );

            myDiagram.model = go.Model.fromJson(
                {
                    nodeDataArray,
                    linkDataArray
                }
            )
        },
        // 过滤初始化模板数据
        filterPersonData(data) {
            return data.filter(item => item._TEST !== 'Template')
        },


        // 修改流程节点text 更新当前节点人员配置信息
        changePersonText(oldData, newData, type){
            let index = this.currentNode; // 当前节点
            fileDataArr.forEach(item => {
                if(item.personId) { // 判断当前文件是否为 人员信息配置文件
                    let ProcessInfoArr = forceArr(item.json.ProcessConfigure.ProcessInfo);
                    item.json.ProcessConfigure.ProcessInfo = ProcessInfoArr.map(item => {
                        if (type === 'key') {
                            if (item._Index == oldData.key) {
                                item._Index = newData
                            }
                            return item
                        } else {
                            if (item._Index == oldData.key) {
                                item._Name = newData
                            }
                            return item
                        }
                    })
                }
            })
        },

        // 流程节点change 更新人员配置函数
        updatePersonData(type, node) {
            let self = this;
            let currentPersonJson = '';
            fileDataArr.forEach(item => {
                if(item.personId === this.currentPerson) {
                    currentPersonJson = item.json
                }
            })
            let tmpJsonArr = currentPersonJson.ProcessConfigure.ProcessInfo;
            if (type == 'add') {
                // 新增
                tmpJsonArr.push(setPersonNodeTmpJson(node.key, node.text))
                if (tmpJsonArr.find(item => item._TEST !== 'Template')) {
                    currentPersonJson.ProcessConfigure.ProcessInfo = this.filterPersonData(tmpJsonArr)
                }
            } else {
                // 删除
                // let newPersonData = []
                currentPersonJson.ProcessConfigure.ProcessInfo = forceArr(tmpJsonArr).filter(item => item.key == node.key);
                // currentPersonJson.ProcessConfigure.ProcessInfo = newPersonData.length == 1 ? newPersonData[0] : newPersonData
            }
            // TODO: 设置currentPerson, 提前设置模型
            let {_Name, _PersonNumber, _AssembleModel} = this.currentPersonJson;
            this.currentPersonJson = Object.assign(currentPersonJson.ProcessConfigure, {
                _Name,
                _PersonNumber,
                _AssembleModel,
            });
            // this.currentPersonJson.ProcessInfo = currentPersonJson.ProcessConfigure.ProcessInfo;
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
            // console.log(this.fileList)
            PromiseFileList = []; // 清空
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
                    console.log('Promise then1', fileDataArr)
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
                        console.log(typeof PersonID)
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
                } else if (/ToolsConfig/g.test(impFileName)) {
                    this.handleTools(file.json, i);
                } else {
                    // 流程信息
                    // processData = file.json;
                    this.processParseData(file.json)
                    this.processTplName = impFileName
                }
            }
        },

        // 工具下拉列表
        handleTools(json) {
            console.log('工具信息', json);
            // this.$message({
            //     message: '工具配置导入成功',
            //     type: 'success'
            // });
            let toolInfoList = json.ToolsConfigure.ToolInfoList.ToolInfo; // 基础工具
            toolInfoList = forceArr(toolInfoList);
            ToolListOptions = this.handleBaseTool(toolInfoList);
        },

        handleBaseTool(arr) {
            return arr.map(item => {
                return {
                    id: item._ID,
                    name: item._Name
                }
            })
        },
        // 流程信息数据 解析
        processParseData(json) {
            console.log('流程信息', json);
            // 清空基础节点
            nodeDataArray = []  // 节点
            linkDataArray = [] // 链接

            //xml转换为json后，当只有一个元素时，格式为对象，非对象数组，强制将它们转为对象数组，以便使用forEach

            this.processJson._ID = json.ProcessConfigure._ID;
            this.processJson._Name = json.ProcessConfigure._Name;

            // 节点组
            let groupArr = {};
            if(json.ProcessConfigure.BigProcessConfigure) {
                let BigProcessConfigure = json.ProcessConfigure.BigProcessConfigure; // 大流程 => 流程图中的组
                if (BigProcessConfigure.BigProcessInfo) {
                    let BigProcessInfo = forceArr(BigProcessConfigure.BigProcessInfo)
                    for (let i = 0; i < BigProcessInfo.length; i++) {
                        let groupItem = BigProcessInfo[i];
                        let length = BigProcessInfo.length + 1;
                        let groupKey = completionZero(groupItem._Index, length);
                        groupArr[groupKey] = groupItem._ProcessSection.split(',');
                        nodeDataArray.push({key: groupKey, isGroup: true, text: groupItem._Name, color: 'blue'})
                    }
                }
                // _Index: "1", _ProcessSection: "1,1-1,1-2", _Name: "拆前置喷头"
            }
            if(json.ProcessConfigure.ProcessInfo.length > 0) {
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
                        loc: `88 ${37 + 150 * (index + 1)}`,
                        // commands: [{ text: "查看", action: "view" }, { text: "删除", action: "view" }]
                    };
                    for ([groupKey, groupVal] of Object.entries(groupArr)) {
                        if (groupVal.includes(item._Index)) {
                            node.group = groupKey;
                        }
                    }
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

                let end = { category: "End", text: "结束", key: 'end', loc: `88 ${37 + 150 * (ProcessInfo.length + 1) }` };
                nodeDataArray.push(end);

                let endKey = ProcessInfo.slice(-1)[0]._Index
                // 添加结束节点link
                linkDataArray.push({ from: endKey, to: 'end', fromPort: "B", toPort: "T" })

            }
            myDiagram.model = go.Model.fromJson(
                {
                    nodeDataArray,
                    linkDataArray
                }
            )

        },

        // 人员信息数据 解析
        personParseData(json, i) {
            console.log('人员信息', json);
                //xml转换为json后，当只有一个元素时，格式为对象，forceArr 非对象数组，强制将它们转为对象数组，以便使用forEach
            this.currentPersonJson = json.ProcessConfigure;
            console.log('this.currentPersonJson',this.currentPersonJson)
        },

        exportFile() {
            // 每次导出把之前的导出文件清空
            fileDataXML = []
            this.editorVal = myDiagram.model.toJson()

            // 导出前 保存当前人员的信息
            let oldPersonJson = JSON.parse(JSON.stringify(this.currentPersonJson));
            fileDataArr.forEach(item => {
                if (item.personId && item.personId === this.currentPerson) {
                    item.json.ProcessConfigure = oldPersonJson;
                }
            })
            // 流程导出
            this.exportProceeXML();

            // TODO: 人员信息导出
            fileDataArr.forEach(item => {
                // 只有文件名AssembledConfig_索引.xml的文件
                if (/AssembledConfig_\d+\.xml/.test(item.name)) {
                    this.exportPersonXML(item);
                }
            })

            this.exportData()
        },

        // 导出人员信息中的事件循环，不要调整格式，调整后会影响导出文件的格式
        forEachEvent(EventList) {
            let Event = ''
            if (typeof EventList == 'object' && EventList.Event instanceof Array) {
                EventList.Event.forEach((item, index) => {
                    Event += `\r\n                <Event Content="${item._Content}"/>`
                    if (index == EventList.Event.length - 1) {
                        Event += `\r\n            `
                    }
                })
            }
            return Event
        },
        // 导出人员信息步骤循环，不要调整格式，调整后会影响导出文件的格式
        forEachStep(stepName, stepInfo) {
            return `<${stepName} Index="${stepInfo._Index}" AnimaIndex="${stepInfo._AnimaIndex}" TriggerObject="${stepInfo._TriggerObject}" ObjectType="${stepInfo._ObjectType}" ObjectName="${stepInfo._ObjectName}"
                    OperationPerson="${stepInfo._OperationPerson}" ColliderMode="${stepInfo._ColliderMode}" ColliderScale="${stepInfo._ColliderScale}" TriggerMode="${stepInfo._TriggerMode}"
                    ShowMode="${stepInfo._ShowMode}" ShowModeTime="${stepInfo._ShowModeTime}" MaskColliderObject="${stepInfo._MaskColliderObject}" NextDelay="${stepInfo._NextDelay}">
            <EventList>${this.forEachEvent(stepInfo.EventList)}</EventList>
        </${stepName}>`
        },
        // 人员信息导出
        exportPersonXML(file) {
            // let { nodeDataArray, linkDataArray } = this.editorVal
            // // TODO: XML 模板修改
            // let xmlDoc = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
            //     '<ToolsConfigure' + ' ToolMode="' + this.ToolMode + '">\r\n' +
            //     '  <ToolPartsList>\r\n';
            // // tmp

            // 人员信息模板，不要调整格式，调整后会影响导出文件的格式
            let ProcessConfigure = file.json.ProcessConfigure
            let ProcessInfo = ProcessConfigure.ProcessInfo
            let xmlDocStart = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
                '<ProcessConfigure' + ' Name="' + ProcessConfigure._Name + '" PersonNumber="' + ProcessConfigure._PersonNumber + '" AssembleModel="' + ProcessConfigure._AssembleModel + '">\r\n'
            let xmlDocEnd = '</ProcessConfigure>'
            let xmlDocContent = ''
            ProcessInfo.forEach((item, index) => {
                xmlDocContent +=
    `<ProcessInfo Index="${item._Index}" Name="${item._Name}" AutoPlay="${item._AutoPlay}">
        ${this.forEachStep('StartEventInfo', item.StartEventInfo)}
        ${this.forEachStep('StepEventInfo', item.StepEventInfo)}
        ${this.forEachStep('EndEventInfo', item.EndEventInfo)}
    </ProcessInfo>`
                if (index < ProcessInfo.length -1) {
                    xmlDocContent +=
    `

    `
                }
            })
            let xmlDoc = `${xmlDocStart}    ${xmlDocContent}\r\n${xmlDocEnd}`
            // console.log(xmlDoc)
            fileDataXML.push({ name: file.name, content: xmlDoc });
            // this.exportData(xmlDoc, xmlfile);
        },

        // 流程信息导出
        exportProceeXML () {
            this.editorVal = myDiagram.model.toJson()
            let { nodeDataArray, linkDataArray } = JSON.parse(this.editorVal);
            let xmlDoc = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
                '<ProcessConfigure' + ' ID="' + this.processJson._ID + '"' + ' Name="' + this.processJson._Name +'">\r\n';
                // '  <ProcessConfigure>\r\n';
            // tmp
            let groupXML = `    <BigProcessConfigure>\n`; // 流程节点组合

            let processInfo = ''; // 流程节点
            let groupArr = {}; //group

            let ProcessSection = {}; //group
            for (let i = 0; i < nodeDataArray.length; i++) {
                let item = nodeDataArray[i];
                item.children = [];
            // nodeDataArray.forEach(item => {
                let processBranch = linkDataArray.filter(link => item.key === link.from);

                // 去除组节点
                // TODO:是否去除开始结束节点
                if (!item.isGroup && !['Start', 'End'].includes(item.category)) {
                    processInfo += `    <ProcessInfo Index="${item.key}" Name="${item.text}" BackIndex="">\n`;
                    processBranch.forEach(branch => {
                        processInfo += `        <ProcessBranch Index="${branch.to}"/>\n`
                    })
                    processInfo += `    </ProcessInfo>\n\n`

                }

                // 当前节点为 组节点
                if (item.isGroup) { // 当前节点为组节点
                    groupArr[item.key] = Object.assign(item, groupArr[item.key]);
                    continue;
                }

                if (item.group) { // 该节点属于组
                    if (Object.keys(groupArr).includes(item.group)){
                        groupArr[item.group].children.push(item.key);
                    } else {
                        groupArr[item.group] = {children: []};
                        groupArr[item.group].children.push(item.key);
                    }
                    // groupArr.forEach(g => {
                    //     if (g.key === item.group) {
                    //         g.children.push(item.key)
                    //     }
                    // })
                }

                // if(item.group && !ProcessSection[item.group]) {
                //     // TODO: 添加组名称
                //     ProcessSection[item.group] = [];
                //     ProcessSection[item.group].push(item.key);
                // } else {
                //     ProcessSection[item.group].push(item.key);
                // }


            // })
            }
            xmlDoc += processInfo;

            // groupArr.forEach(g => {
            //     console.log(g.children)
            //     groupXML +=  `    <BigProcessInfo Index="${g.key}" ProcessSection="${g.children.toString()}" Name="${g.text}"/>\n`;
            // })
            for([key, val] of Object.entries(groupArr)){
                groupXML += `        <BigProcessInfo Index="${key}" ProcessSection="${val.children.toString()}" Name="${val.text}"/>\n`
            }


            groupXML += '   </BigProcessConfigure>\n\n';

            xmlDoc += groupXML;
            xmlDoc += '</ProcessConfigure>\r\n';

            fileDataXML.push({name:'ProcessConfig.xml', content:xmlDoc});
            // this.exportData(xmlDoc, 'ProcessConfig.xml');
        },

        // 更新当前 节点信息
        updateCurrentNode(step, value) {
            this.currentPersonJson.ProcessInfo[this.currentNodeIndex][step] = value;
        },

        //导出文件
        exportData() {
            // var blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
            // saveAs(blob, file);
            if (!fileDataXML.length) {

                return false;
            }
            let currTime = getCurrTime();

            var zip = new JSZip();
            fileDataXML.forEach(function (obj) {
                // zip包里面不断塞 xml文件
                zip.file(obj.name, obj.content);
            });
            // 生成zip文件并下载
            zip.generateAsync({
                type: 'blob'
            }).then(function(content) {
                saveAs(content, `process_${currTime}.zip`);
                // // 下载的文件名
                // var filename = key + '.zip';
                // // 创建隐藏的可下载链接
                // var eleLink = document.createElement('a');
                // eleLink.download = filename;
                // eleLink.style.display = 'none';
                // // 下载内容转变成blob地址
                // eleLink.href = URL.createObjectURL(content);
                // // 触发点击
                // document.body.appendChild(eleLink);
                // eleLink.click();
                // // 然后移除
                // document.body.removeChild(eleLink);
            });

        },

    }
}
