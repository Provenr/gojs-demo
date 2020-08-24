let impFileName = ''; // 导入文件名称
let animationInit = ''; // 文件数据
let xmlns = ''; //xml文件头部xmlns的信息
let baseToolContent = ''; // 基础工具xml
let groupToolContent = ''; // 组合工具xml

const Main = {
    data() {
        return {

            fileContent: '',
            password: '',

            baseToolTableData: [],
            ToolMode: '0', // 获取模式 ToolMode="鼠标模式 - 0 || 模型模式 - 1"
            baseToolCurrentIndex: null,
            baseToolCurrentRow: null,
            baseToolDialogVisible: false,
            baseToolContent: '', // 基础工具xml
            singleToolInfo: {
                id:'',
                name: '',
                ban_icon: '',
                ban_mouse: '',
                ban_module: '',
                tips: ''
            },

            toolList: [],

            groupToolTableData: [],
            groupToolCurrentIndex: null,
            groupToolCurrentRow: null,
            groupToolDialogVisible: false,
            // groupToolContent: '', // 组合工具xml
            groupToolInfo: {
                id:'',
                name: '',
                toolType: '0',
                toolArr: [],
            },
        }
    },
    filters: {
        toolTypeZH: function (val) {
            return val === '0' ? '常规' : '组合'
        }
    },
    computed: {
        classPrefix: () => 'initTool-box'
    },
    mounted() {
        // this.baseToolTableData = tool.base
        // this.groupToolTableData = tool.group
    },

    methods: {
        // importFile(e) {
        //     console.log(e)
        //     let file = readFile(e);
        //     console.log(file)
        // },


        // 基础工具处理
        handleBaseTool(arr) {
            return arr.map(item => {
                return this.renameKeys({
                    _ID: "id",
                    _Icon: "ban_icon",
                    _Modle: "ban_module",
                    _MouseIcon: "ban_mouse",
                    _Name: "name",
                    _Tips: "tips"
                },item)
            })
        },

        handleBaseToolCurrentChange(val) {
            this.baseToolCurrentRow = val;
        },
        handleEditBaseTool(index, row) {
            // console.log('base',index, row)
            this.singleToolInfo = row;
            this.baseToolCurrentIndex = index;
            this.baseToolDialogVisible = true;
        },
        baseToolConfirm() {
            let index = this.baseToolCurrentIndex;
            if (index === this.baseToolTableData.length) {
                // 新建
                this.singleToolInfo = Object.assign({
                    ban_icon: "",
                    ban_module: "",
                    ban_mouse: "",
                    id: "",
                    name: "",
                    tips: ""}, this.singleToolInfo)
            }
            let tmp = [];
            // this.baseToolTableData = []

            console.log(this.baseToolTableData)
            let validate = this.baseToolTableData.some(item => item.id === this.singleToolInfo.id)

            console.log(validate);
            if (validate) {
                this.$alert(`索引为 ${this.singleToolInfo.id} 的工具已经存在`);
                return false;
            }
            this.$set(this.baseToolTableData, index, this.singleToolInfo);
            this.baseToolDialogVisible = false;
            this.toolList = this.baseToolTableData.slice();
            this.toolList.unshift({id: '', name: ''})
            console.log('baseTabe', this.baseToolTableData)
        },

        // 工具组处理
        handleGroupToolCurrentChange(val) {
            this.groupToolCurrentRow = val;
        },
        handleEditGroupTool(index, row) {
            // console.log('group',index, row)
            this.groupToolInfo = row;
            this.groupToolCurrentIndex = index;
            this.groupToolDialogVisible = true;
        },
        //  工具组处理
        handleGroupTool(arr) {
            return arr.map(item => {
                return this.renameKeys({
                    _Index: 'id',
                    _Name: 'name',
                    _ToolType: 'toolType'
                },item)
            })
        },
        groupToolConfirm() {
            let index = this.groupToolCurrentIndex;
            if (index === this.groupToolTableData.length) {
                // 新建
                this.groupToolInfo = Object.assign({
                    id: "",
                    name: "",
                    toolType: "",
                    _Tool1: "",
                    _Tool2: "",
                    _Tool3: "",
                    _Tool4: ""}, this.groupToolInfo)
            }
            this.$set(this.groupToolTableData, index, this.groupToolInfo);
            this.groupToolDialogVisible = false;
            console.log('groupTabe', this.groupToolInfo)
        },


        removeItem(type){
            let index = 0;
            if (type === 'base') {
                index = this.baseToolCurrentRow.id;
                this.baseToolTableData = this.baseToolTableData.filter(item => item.id !== index)
            } else {
                index = this.groupToolCurrentRow.id;
                this.groupToolTableData = this.groupToolTableData.filter(item => item.id !== index)
            }
            // if(index != 0){
            //     list.splice(index, 1);
            // }
        },

        addItem(type, list){
            if (type === 'base') {
                // 基础工具
                this.singleToolInfo = {}

                this.baseToolDialogVisible = true;
                this.baseToolCurrentIndex = this.baseToolTableData.length;
            } else{
                // 组合工具
                this.groupToolInfo = {}
                this.groupToolDialogVisible = true;
                this.groupToolCurrentIndex = this.groupToolTableData.length;
            }
        },



        loadJsonFile(file, fileList) {
            if (fileList) {
                for (let i = 0; i < fileList.length; i++) {
                    let file = fileList[i]
                    impFileName = file.name;
                    // console.log(impFileName)
                    if (!file) continue
                    let reader = new FileReader()
                    reader.onload = async (e) => {
                        let content = e.target.result;
                        //读取xml并转为tree
                        let jsonObj = xml2Json(content);
                        // console.log(jsonObj)
                        this.json2Tree(jsonObj);

                    }
                    reader.readAsText(file.raw)
                }
            }
        },
        exportFile() {
            // var isSave = true;
            let xmlDoc = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
                '<ToolsConfigure' + ' ToolMode="' + this.ToolMode + '">\r\n' +
                '  <ToolPartsList>\r\n'

            // 组合工具 模板
            //     <ToolParts Index="6" Name="扳手6" ToolType="1" ToolFinal="1" Tool1="1" Tool2="" Tool3="" Tool4=""/>


            if (!this.groupToolTableData.length) {
                xmlDoc += '  </ToolPartsList>\r\n'
            } else {
                this.groupToolTableData.forEach(element => {
                    console.log(element)
                    let finalTool = '';
                    if (element._Tool1) {
                        finalTool = element._Tool1
                    }
                    if (element._Tool2) {
                        finalTool = element._Tool2
                    }
                    if (element._Tool3) {
                        finalTool = element._Tool3
                    }
                    if (element._Tool4) {
                        finalTool = element._Tool4
                    }
                    xmlDoc += '    <ToolParts Index="' + element.id +'" Name="' + element.name + '" ToolType="' + element.toolType + '" ToolFinal="' + finalTool + '" Tool1="' + element._Tool1 + '" Tool2="' + element._Tool2 + '" Tool3="' + element._Tool3 + '" Tool4="' + element._Tool4 + '"/>\r\n'
                    // xmlDoc += `    <ToolParts Index="${element.id}" Name="${element.name}" ToolType="${element.toolType}" ToolFinal="${element._Tool4}" Tool1="${element._Tool1}" Tool2="${element._Tool2}" Tool3="${element._Tool3}" Tool4="${element._Tool4}"/>\r\n`
                });
                xmlDoc += '  </ToolPartsList>\r\n'
            }

            xmlDoc +=  '  <ToolInfoList>\r\n'

            // 基础工具
            if (!this.baseToolTableData.length) {
                xmlDoc += '  </ToolInfoList>\r\n'
            } else {
                this.baseToolTableData.forEach(element => {
                    console.log(element)
                    xmlDoc += `    <ToolInfo ID="${element.id}" Name="${element.name}" Icon="${element.ban_icon}" MouseIcon="${element.ban_mouse}" Modle="${element.ban_module}" Tips="${element.tips}"/>\r\n`
                });
                xmlDoc += '  </ToolInfoList>\r\n'
            }

            xmlDoc += "</ToolsConfigure>";

            //导出文件，文件名由固定部分和当前日期组成
            //如果是导入的文件，则文件名的固定部分为原来的文件名，如果是新创建的，文件名固定部分config_test_
            let currTime = getCurrTime();
            let xmlFile = '';
            if (impFileName != '') {
                let len = impFileName.length;
                xmlfile = impFileName.substring(0, len - 4) + '_' + currTime + '.xml';
            } else {
                xmlfile = 'ToolsConfig_' + currTime + '.xml';
            }

            this.exportData(xmlDoc, xmlfile);

        },


        json2Tree(jsonObj){
            this.ToolMode = jsonObj.ToolsConfigure._ToolMode;

            // TODO: ToolInfoList & ToolPartsList 判断为空
            let toolInfoList = jsonObj.ToolsConfigure.ToolInfoList.ToolInfo; // 基础工具
            let toolPartsList = jsonObj.ToolsConfigure.ToolPartsList.ToolParts; // 组合工具

            //xml转换为json后，当stage和clip只有一个元素时，格式为对象，非对象数组，强制将它们转为对象数组，以便使用forEach
            toolInfoList = forceArr(toolInfoList);
            toolPartsList = forceArr(toolPartsList);

            this.baseToolTableData = this.handleBaseTool(toolInfoList)
            this.groupToolTableData = this.handleGroupTool(toolPartsList)
            console.log(this.groupToolTableData)
        },
        renameKeys(keysMap, obj) {
            return Object.keys(obj)
                .reduce((acc, key) => ({
                    ...acc,
                    ...{ [keysMap[key] || key]: obj[key] }
                }), {});
        },

        //导出文件
        //doc为拼接好的字符串，file为文件名
        exportData(doc, file) {
            var blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
            saveAs(blob, file);
        },

        decrypt() {
            let that = this;
            if (this.passWord === '' || this.passWord === null || this.passWord.length !== 32) {
                this.$alert('请32位输入密码');
                return false;
            }
            if (this.fileContent) {
                try {
                    this.cipherText = decryptAES(this.fileContent,  this.passWord)
                } catch {
                    this.$alert('解码失败,请确认密码')
                }
            } else {
                this.$message({
                    message: '请选择需要解密的文件',
                    type: 'warning'
                });
            }
        },
        encrypt() {
            let that = this;
            if (this.passWord === '' || this.passWord === null || this.passWord.length !== 32) {
                this.$alert('请32位输入密码');
                return false;
            }
            if (this.fileContent) {
                this.cipherText = encryptAES(this.fileContent, this.passWord);
            } else {
                this.$message({
                    message: '请选择需要加密的文件',
                    type: 'warning'
                });
            }
        },

    }
}
