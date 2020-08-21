var id = 1; //初始id，用于部分需要id自增的场合
var nodeid; //当前node的id
var currNode = ''; //当前选中的树节点
var currPNode = ''; //当前的父节点，主要用于事件的父节点——帧
var currClass = ''; //事件当前选中的类对象
var clsText = ''; //当前类的中文注释名
var mtdText = ''; //当前方法的中文注释名
var impFileName = ''; //导入文件名
var animationInit = ''; //配置文件中的底部<AnimationInit>中的大段数据
var xmlns = ''; //xml文件头部xmlns的信息

//播放类型选项
var loopTypeOptions = [{
    code: '1',
    text: '是'
}, {
    code: '2',
    text: '否'
}];

var Main = {
    data() {
        return {
            /**
             * 处理片段信息，包括【部分】-【片段】-【单帧】
             */

            ModelObject: {
                AnimationName: '', //主资源包
                CameraName: '', //附加资源
                AnimationModel: '', //动画模型
                AnimationContent: '', //动画内容
                NoAnimation: '', //无动画

                //处理搜索，暂未用到
                ClipSearch: {
                    SelectType: '',
                    SearchText: ''
                }
            },

            AnimationClip: { //片段信息
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


            /**
             * 处理事件信息
             * Content数据格式：帧数_类名_函数名_参数
             * 参数格式：#obj目标物体名#obj#par数值#par#dotwDotween模块#dotw
             */

            AnimationEvent: {
                FrameNo: '', //整型，在起始结束帧范围内
                ClassName: '', //类名
                MethodName: '', //方法名
                NewMethodName: [], //级联临时
                //OptionItems: JSON.parse(JSON.stringify(eventOptionItems)),
                OptionItems: JSON.parse(JSON.stringify(classmethod)),
                TargetObject: { //目标物体
                    TypeRadio: '', //主单选按钮
                    SingleObject: '', //单物体
                    AndObjects: {
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
                TargetData: [],
                DurationMinute: 0, //时长分
                DurationSecond: 0, //时长秒
                PlayType: '', //播放类型
                LoopType: '', //循环类型
                LoopTimes: '', //循环次数
            },

            /**
             * 处理片段信息列表信息，由“ModelObject”中相关信息汇总
             */
            AnimationStage: {
                Index: '', //编号
                ClipFrame: '', //帧号
                GroupName: '', //大片段号
                TriggerObject: '' //触发物
            },

            //片段信息表数据
            tableData: [],

            // 事件对象信息表数据
            //targetData: [],
            targetData: [{
                'seen': false, //可见性
                'Target': '', //目标
                "StartValue": '默认', //起始值
                'EndValue': '' //结束值
            }],

            //树节点
            treeNodes: JSON.parse(JSON.stringify(treeNodeData)),
            //循环类型
            loopTypeOptions: JSON.parse(JSON.stringify(loopTypeOptions)),

            //控件禁用状态：初始均不可用
            eventCtrlDisable: {
                frameNo: true, //帧号
                selectCtrl: true, //类、方法下拉框
                radioMain: true, //主单选按钮
                singleObj: true, //单选物体
                nonSingleObj: true, //非单选物体
                par: true, //参数表
                dotw: true, //dotw
                clipInfoArea: true, //片段信息区域的控件
                importBtn: false //导入按钮
            }

        }
    },


    methods: {

        //保存提交按钮
        //目前存在问题：使用\n换行，发现与原始文件换行符号不一致，换成\r\n，表面看起来一致，但有时候保存后文件与导入的文件有看不见差异（SVN的文件比较功能）
        onSubmit() {
            var isSave = true;
            var xmlDoc = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
                '<AnimationConfigure' + (xmlns == '' ? '' : (' ' + xmlns)) + ' Name="' + this.ModelObject.AnimationContent + '" Version="1.0">\r\n' +
                '  <ModelObject AnimationName="' + this.ModelObject.AnimationModel + '" CameraName="' + this.ModelObject.CameraName + '"';

            if (this.ModelObject.NoAnimation == '') {
                xmlDoc += ' />\r\n'
            } else {
                xmlDoc += '>\r\n'
                var noAnim = this.ModelObject.NoAnimation.split(',');
                noAnim.forEach(element => {
                    xmlDoc += '    <NoAnimation ModelName="' + element + '" />\r\n'
                });
                xmlDoc += '  </ModelObject>\r\n';
            }

            var clipSection = ''; //片段
            var frame = ''; //帧
            var eventSection = ''; //事件
            var stageSection = '  <AnimationStage>\r\n' //stage
            var count = 0;
            var clipId = 0;
            this.treeNodes.forEach(node => {
                if (node.ClipFrameStart == '' || node.ClipFrameEnd == '') {
                    isSave = false;
                } else {
                    count++;
                    // 配置XML中的<AnimationStage>
                    stageSection += '    <Sort Index="' + count +
                        '" ClipFrame="' + node.ClipFrameStart + '_' + node.ClipFrameEnd +
                        '" GroupName="' + node.Name +
                        '" TriggerObject="' + this.getObjectData(node.TriggerObject, 1) +
                        '" />\r\n';

                    // 配置XML中的<AnimationClip>
                    if (node.children != undefined && node.children.length > 0) {
                        node.children.forEach(node => {
                            clipId++;
                            //clipSection += '  <AnimationClip ID="' + node.id +
                            if (node.ClipFrameStart == '' || node.ClipFrameEnd == '') {
                                //如果起始结束帧缺失，提示
                                isSave = false;
                            } else {
                                //片段信息
                                clipSection += '  <AnimationClip ID="' + clipId +
                                    '" Name="' + node.Name +
                                    '" ClipFrame="' + node.ClipFrameStart + '_' + node.ClipFrameEnd +
                                    '" Speed="' + node.Speed +
                                    '" TriggerObject="' + this.getObjectData(node.TriggerObject, 1) +
                                    '" TriggerObjectMove="' + node.TriggerObjectMove + '"'; //+
                                //'>\r\n';
                                // 帧
                                if (node.children != undefined && node.children.length > 0) {
                                    node.children.forEach(node => {
                                        frame = node.label;
                                        //事件
                                        if (node.children != undefined && node.children.length > 0) {
                                            node.children.forEach(node => {
                                                eventSection += '    <Event Content="' + frame +
                                                    '_' + node.ClassName +
                                                    '_' + node.MethodName + '_';
                                                // 事件的目标对象obj
                                                if (node.TargetObject != undefined && forceArr(node.TargetObject).length > 0 && this.getObjectData(node.TargetObject, 2) != '') {
                                                    //getObjectData根据逻辑计算取得对象字符串，参数2表示事件， 参数1表示片段
                                                    eventSection += '#obj' + this.getObjectData(node.TargetObject, 2) + '#obj';
                                                }
                                                //参数par，如果没有数值，不拼接
                                                if (node.TargetData != undefined && forceArr(node.TargetData).length > 0 && (node.TargetData[0].StartValue != '' || node.TargetData[0].EndValue != '')) {
                                                    if (node.TargetObject != undefined) {
                                                        if (node.TargetData[0].StartValue == '默认') {
                                                            eventSection += '#par#par'
                                                        } else {
                                                            eventSection += '#par' + this.getTargetTableValue_Bak(node.TargetObject, node.TargetData) + '#par'
                                                        }
                                                    } else {
                                                        var msg = currPNode.label + '帧事件“' + node.label + '”存在无效信息，请修改';
                                                        this.$alert(msg, '警告', { type: 'warning' });
                                                        //isSave = false;
                                                    }

                                                }
                                                //dotw部分，判断参数是否未填写，如果未填写，则不会拼接到事件字符串中
                                                if (node.DurationMinute != undefined &&
                                                    node.DurationSecond != undefined &&
                                                    node.PlayType != undefined &&
                                                    node.PlayType != '' &&
                                                    node.LoopType != undefined &&
                                                    node.LoopTimes != undefined &&
                                                    node.LoopTimes != '') {
                                                    var time = parseInt(node.DurationMinute) * 60 + parseFloat(node.DurationSecond);
                                                    //if (time != 0) { 发现有事件持续事件为0
                                                    eventSection += '#dotw' + time +
                                                        '#' + node.PlayType +
                                                        '#' + node.LoopType +
                                                        '#' + node.LoopTimes + '#dotw';
                                                    //}
                                                }
                                                eventSection += '" />\r\n';

                                            });
                                        }
                                    });
                                    clipSection += '>\r\n' + eventSection;
                                    // 事件信息追加后将其清空，避免后面重复追加
                                    eventSection = '';
                                    clipSection += '  </AnimationClip>\r\n';
                                } else {
                                    clipSection += ' />\r\n'
                                }
                            }
                        });
                    } else {
                        isSave = false;
                    }
                }
            });
            xmlDoc += clipSection;
            stageSection += '  </AnimationStage>\r\n'
            xmlDoc += stageSection;
            //xmlDoc += '  <AnimationInit>\r\n  </AnimationInit>\r\n';
            if (animationInit.length == 0) {
                animationInit = '\r\n';
            }
            xmlDoc += '  <AnimationInit>' + animationInit + '  </AnimationInit>\r\n';
            xmlDoc += "</AnimationConfigure>";

            //导出文件，文件名由固定部分和当前日期组成
            //如果是导入的文件，则文件名的固定部分为原来的文件名，如果是新创建的，文件名固定部分config_test_
            var currTime = getCurrTime();
            var xmlFile = '';
            if (impFileName != '') {
                var len = impFileName.length;
                xmlfile = impFileName.substring(0, len - 4) + '_' + currTime + '.xml';
            } else {
                xmlfile = 'config_test_' + currTime + '.xml';
            }

            if (isSave) {
                this.exportData(xmlDoc, xmlfile);
            } else {
                this.$alert('片段起始帧和结束帧不能有空值，且大片段必须有子片段', '警告', { type: 'warning' })
            }


            //起初设计的导出一份json配置文件
            // var jsonContent = {
            //     'AnimationName': this.ModelObject.AnimationName,
            //     'CameraName': this.ModelObject.CameraName,
            //     'AnimationModel': this.ModelObject.AnimationModel,
            //     'AnimationContent': this.ModelObject.AnimationContent,
            //     'TreeNodes': this.treeNodes
            // };

            // var jsonDoc = JSON.stringify(jsonContent);
            // var jsonFile = 'config_test_' + currTime + '.jcfg';
            // this.exportData(jsonDoc, jsonFile);
        },

        //根据传入的对象数据，进行逻辑判断，最后合成对象字符串
        //因片段信息和事件信息两部分都有触发目标物体，整合在此一个方法中
        //type=1为片段，2为事件
        getObjectData(object, type) {
            var objectData = '';
            var condition = '';
            if (type == '1') {
                condition = object.TriggerRadio; //片段
            } else {
                condition = object.TypeRadio; //事件
            }
            switch (condition) {
                case 1: //单
                    objectData = object.SingleObject;
                    break;
                case 2: //与
                    switch (object.AndObjects.AndRadio) {
                        case 1: //无序
                            objectData = object.AndObjects.NoSqcObjects;
                            break;
                        case 2: //有序
                            if (object.AndObjects.SqcObject1 != '' && object.AndObjects.SqcObject2 != '') {
                                //如果起始和结束输入框都不为空，进行有序计算和拼接
                                objectData = this.sqcObject(object.AndObjects.SqcObject1, object.AndObjects.SqcObject2);
                            }
                            break;
                    }
                    //将拼接的字符串中“,”换成“+”
                    objectData = objectData.toString().replace(/,/g, '+');
                    break;
                case 3: //或
                    switch (object.OrObjects.OrRadio) {
                        case 1: //无序
                            objectData = object.OrObjects.NoSqcObjects;
                            break;
                        case 2: //有序
                            if (object.OrObjects.SqcObject1 != '' && object.OrObjects.SqcObject2 != '') {
                                objectData = this.sqcObject(object.OrObjects.SqcObject1, object.OrObjects.SqcObject2);
                            }
                            break;
                    }
                    //将拼接的字符串中“,”换成“|”
                    objectData = objectData.toString().replace(/,/g, '|');
                    break;
                default:
                    objectData = ''
            }
            return objectData;
        },

        //汇总目标参数表数据，只取结束值，起始值统一“默认”，但没有保存到xml中
        //本方法已不使用
        // getTargetTableValue(object, data) {
        //     var objectData = '';
        //     switch (object.TypeRadio) {
        //         case 1: //单
        //             objectData = data[0].EndValue + 'x';
        //             break;
        //         case 2: //与
        //             data.forEach(element => {
        //                 objectData += element.EndValue + '+';
        //             });
        //             break;
        //         case 3: //或
        //             data.forEach(element => {
        //                 objectData += element.EndValue + '|';
        //             });
        //             break;
        //         default:
        //             //无触发物体时
        //             objectData = data[0].EndValue + 'x';
        //             break;
        //     }
        //     var length = objectData.length;
        //     if (length > 0) {
        //         //去掉结尾多余的分隔父
        //         objectData = objectData.substring(0, length - 1);
        //     }
        //     return objectData;
        // },
        //上面方法的备份，区别为计算参数数据表时加入了起始值
        //当前采用的方法
        getTargetTableValue_Bak(object, data) {
            var objectData = '';
            switch (object.TypeRadio) {
                default: //没有触发物体，或者TypeRadio为空
                    if (data[0].EndValue == '') {
                        //没有结束值则只取起始值，后面的“x”用于分隔
                        objectData = data[0].StartValue + 'x';
                    } else {
                        //如果有结束值，则~
                        objectData = data[0].StartValue + '~' + data[0].EndValue + 'x';
                    }
                break;
                case 1: //单，算法与default一致
                        if (data[0].EndValue == '') {
                            objectData = data[0].StartValue + 'x';
                        } else {
                            objectData = data[0].StartValue + '~' + data[0].EndValue + 'x';
                        }
                        //objectData = data[0].StartValue + '~' + data[0].EndValue + 'x';
                    break;
                case 2: //与
                    //循环取参数表中每一行数据，结尾的加号用于分隔
                        data.forEach(element => {
                        if (element.EndValue == '') {
                            objectData += element.StartValue + '+';
                        } else {
                            objectData += element.StartValue + '~' + element.EndValue + '+';
                        }
                    });
                    break;
                case 3: //或
                    //循环取参数表中每一行数据，结尾的连接符用于分隔不同物体的参数
                        data.forEach(element => {
                        if (element.EndValue == '') {
                            objectData += element.StartValue + '|';
                        } else {
                            objectData += element.StartValue + '~' + element.EndValue + '|';
                        }
                    });
                    break;
            }
            var length = objectData.length;
            if (length > 0) {
                // 去掉结尾多余的'+'或者'|'
                objectData = objectData.substring(0, length - 1);
            }
            return objectData;
        },

        //树节点点击事件：将节点存储的数值赋予对应控件
        handleNodeClick(data, e) {
            //保存树控件当前选中节点的信息到全局，通过$refs访问的两项实际在data中都可获取
            nodeid = this.$refs.vuetree.getCurrentKey();
            currNode = this.$refs.vuetree.getCurrentNode();
            currPNode = e.parent.data;

            //点击树节点时，事件各控件清空
            this.blankCtrl();

            if (data.id < 10000) {
                // 10000以下为片段
                this.eventCtrlDisable.clipInfoArea = false;
                this.eventCtrlDisable.frameNo = true;
                this.eventCtrlDisable.selectCtrl = true;
                this.eventCtrlDisable.radioMain = true;
                this.eventCtrlDisable.singleObj = true;
                this.eventCtrlDisable.nonSingleObj = true;
                this.eventCtrlDisable.par = true;
                this.eventCtrlDisable.dotw = true;
                // 片段的label中如有起止帧号，则在[]内
                var pos = data.label.indexOf(']');
                if (pos > 0) {
                    //解析label和帧号
                    var frames = data.label.substr(1, pos - 1).split('-');
                    this.AnimationClip.Name = data.label.substring(pos + 1, data.label.length);
                    this.AnimationClip.ClipFrameStart = frames[0];
                    this.AnimationClip.ClipFrameEnd = frames[1];
                } else {
                    this.AnimationClip.ID = data.id;
                    this.AnimationClip.Name = data.label;
                    this.AnimationClip.ClipFrameStart = '';
                    this.AnimationClip.ClipFrameEnd = '';
                }
                //播放速度
                this.AnimationClip.Speed = data.Speed;


                //判断节点是否包含TriggerObject，
                if (data.hasOwnProperty('TriggerObject')) {
                    // 先清空所有输入框，单选按钮置空，避免从树节点向控件填充数据时造成混乱
                    this.AnimationClip.TriggerObject.SingleObject = '';
                    this.AnimationClip.TriggerObject.AndObjects.NoSqcObjects = '';
                    this.AnimationClip.TriggerObject.AndObjects.SqcObject1 = '';
                    this.AnimationClip.TriggerObject.AndObjects.SqcObject2 = '';
                    this.AnimationClip.TriggerObject.OrObjects.NoSqcObjects = '';
                    this.AnimationClip.TriggerObject.OrObjects.SqcObject1 = '';
                    this.AnimationClip.TriggerObject.OrObjects.SqcObject2 = '';
                    //清空单选按钮
                    this.AnimationClip.TriggerObject.TriggerRadio = 0;
                    this.AnimationClip.TriggerObject.AndObjects.AndRadio = 0;
                    this.AnimationClip.TriggerObject.OrObjects.OrRadio = 0

                    //开始填充控件
                    this.AnimationClip.TriggerObject.TriggerRadio = data.TriggerObject.TriggerRadio;
                    switch (this.AnimationClip.TriggerObject.TriggerRadio) {
                        case 1: //单
                            this.AnimationClip.TriggerObject.SingleObject = data.TriggerObject.SingleObject;
                            break;
                        case 2: //与
                            this.AnimationClip.TriggerObject.AndObjects.AndRadio = data.TriggerObject.AndObjects.AndRadio;
                            switch (this.AnimationClip.TriggerObject.AndObjects.AndRadio) {
                                case 1:
                                    this.AnimationClip.TriggerObject.AndObjects.NoSqcObjects = data.TriggerObject.AndObjects.NoSqcObjects;
                                    break;
                                case 2:
                                    this.AnimationClip.TriggerObject.AndObjects.SqcObject1 = data.TriggerObject.AndObjects.SqcObject1;
                                    this.AnimationClip.TriggerObject.AndObjects.SqcObject2 = data.TriggerObject.AndObjects.SqcObject2;
                                    break;
                            }
                            break;
                        case 3: //或
                            this.AnimationClip.TriggerObject.OrObjects.OrRadio = data.TriggerObject.OrObjects.OrRadio;
                            switch (this.AnimationClip.TriggerObject.OrObjects.OrRadio) {
                                case 1:
                                    this.AnimationClip.TriggerObject.OrObjects.NoSqcObjects = data.TriggerObject.OrObjects.NoSqcObjects;
                                    break;
                                case 2:
                                    this.AnimationClip.TriggerObject.OrObjects.SqcObject1 = data.TriggerObject.OrObjects.SqcObject1;
                                    this.AnimationClip.TriggerObject.OrObjects.SqcObject2 = data.TriggerObject.OrObjects.SqcObject2;
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
            } else if (data.id > 10000 && data.id < 100000) {
                //帧，10000~100000之间的id为帧
                //因为帧节点唯一的操作就是修改帧号，不需要动事件下面的部分，所以将下面的参数控件全部禁用
                this.eventCtrlDisable.frameNo = false;
                this.eventCtrlDisable.clipInfoArea = true;
                this.eventCtrlDisable.selectCtrl = true;
                this.eventCtrlDisable.selectCtrl = true;
                this.eventCtrlDisable.radioMain = true;
                this.eventCtrlDisable.singleObj = true;
                this.eventCtrlDisable.nonSingleObj = true;
                this.eventCtrlDisable.par = true;
                this.eventCtrlDisable.dotw = true;

                this.AnimationEvent.FrameNo = data.label;

            } else {
                //事件，id》100000
                this.eventCtrlDisable.clipInfoArea = true;
                this.eventCtrlDisable.frameNo = true;
                this.eventCtrlDisable.selectCtrl = false;
                // this.eventCtrlDisable.radioMain = false;
                // this.eventCtrlDisable.singleObj = false;
                // this.eventCtrlDisable.nonSingleObj = false;
                // this.eventCtrlDisable.par = false;
                // this.eventCtrlDisable.dotw = false;

                this.AnimationEvent.ClassName = currNode.ClassName;
                this.AnimationEvent.MethodName = currNode.MethodName;
                //console.log(currNode.MethodName)
                if (currNode.ClassName != '') {
                    // 仅仅将类名和方法名和传递进来不够，需要根据类名，查询到该类完整集合，以便在方法下拉框中呈现该类的完整的方法集，便于后面重新选择
                    this.selectChange(currNode.ClassName, currNode.MethodName);

                    // 下面部分可能是写重了，时间来不及，未给予处理，不影响
                    this.AnimationEvent.MethodName = currNode.MethodName;
                    if (currNode.TargetObject != undefined) {
                        this.AnimationEvent.TargetObject.TypeRadio = currNode.TargetObject.TypeRadio;
                        this.AnimationEvent.TargetObject.SingleObject = currNode.TargetObject.SingleObject;
                    }
                }

                //根据当前树节点中TargetObject的数据，填充目标对象的控件
                //此部分在“结构认知”中进行了显著优化，此处时间不足，未处理，后续维护者如有事件，请参考“结构认知”
                //处理的主要逻辑就是给对应的控件赋值，无关的置空
                if (currNode.TargetObject != undefined) {
                    this.AnimationEvent.TargetObject.TypeRadio = data.TargetObject.TypeRadio;
                    switch (this.AnimationEvent.TargetObject.TypeRadio) {
                        case 1: //单
                            //单逻辑下，仅赋值单选主按钮和单值文本框
                            this.AnimationEvent.TargetObject.SingleObject = data.TargetObject.SingleObject;
                            this.AnimationEvent.TargetObject.AndObjects.AndRadio = 0;
                            this.AnimationEvent.TargetObject.OrObjects.OrRadio = 0;
                            this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
                            this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                            this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                            this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                            this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                            this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';
                            break;
                        case 2: //与
                            this.AnimationEvent.TargetObject.AndObjects.AndRadio = data.TargetObject.AndObjects.AndRadio;
                            switch (this.AnimationEvent.TargetObject.AndObjects.AndRadio) {
                                case 1:
                                    //赋值与单选按钮和无序文本框
                                    this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = data.TargetObject.AndObjects.NoSqcObjects;

                                    this.AnimationEvent.TargetObject.SingleObject = '';
                                    this.AnimationEvent.TargetObject.OrObjects.OrRadio = 0;
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                    this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';
                                    break;
                                case 2:
                                    //赋值与单选按钮和有序文本框
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = data.TargetObject.AndObjects.SqcObject1;
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = data.TargetObject.AndObjects.SqcObject2;

                                    this.AnimationEvent.TargetObject.SingleObject = '';
                                    this.AnimationEvent.TargetObject.OrObjects.OrRadio = 0;
                                    this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = ''
                                    this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';
                                    //更新事件目标表数据
                                    //暂移到外部
                                    break;
                            }
                            break;
                        case 3: //或
                            this.AnimationEvent.TargetObject.OrObjects.OrRadio = data.TargetObject.OrObjects.OrRadio;
                            switch (this.AnimationEvent.TargetObject.OrObjects.OrRadio) {
                                case 1:
                                    //赋值与单选按钮和无序文本框
                                    this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = data.TargetObject.OrObjects.NoSqcObjects;

                                    this.AnimationEvent.TargetObject.SingleObject = '';
                                    this.AnimationEvent.TargetObject.AndObjects.AndRadio = 0;
                                    this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = ''
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';
                                    break;
                                case 2:
                                    //赋值与单选按钮和有序文本框
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = data.TargetObject.OrObjects.SqcObject1;
                                    this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = data.TargetObject.OrObjects.SqcObject2;

                                    this.AnimationEvent.TargetObject.SingleObject = '';
                                    this.AnimationEvent.TargetObject.AndObjects.AndRadio = 0;
                                    this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = ''
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                    this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                    this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }

                //更新事件目标表数据
                //先将参数表置空，保留一行默认可输入的数据，以备无触发对象时的参数处理
                //如果不清空，后面的追加会导致重复
                this.targetData = [{
                    'seen': false,
                    'Target': '',
                    "StartValue": '默认',
                    'EndValue': ''
                }];
                //处理参数表
                if (data.TargetData != undefined && data.TargetData.length != 0) {
                    this.targetData = [];
                    // 遍历数据push到参数表
                    data.TargetData.forEach(element => {
                        this.updateTargetTable(element.Target, element.StartValue, element.EndValue);
                    });
                }
                //dotw部分，直接取值
                if (data.DurationMinute != undefined) {
                    this.AnimationEvent.DurationMinute = data.DurationMinute;
                    this.AnimationEvent.DurationSecond = data.DurationSecond;
                    this.AnimationEvent.PlayType = data.PlayType;
                    this.AnimationEvent.LoopType = data.LoopType;
                    this.AnimationEvent.LoopTimes = data.LoopTimes;
                }

                //console.log(this.treeNodes)
            }
        },

        //控件值改变后存入树节点
        //因为对树节点频繁切换操作，需要实时将数据保存到对应节点，避免后面操作覆盖前面
        ctrlChange(type) {
            if (currNode != null) {
                currNode.Name = this.AnimationClip.Name;
                currNode.label = '[' + this.AnimationClip.ClipFrameStart + '-' + this.AnimationClip.ClipFrameEnd + ']' + this.AnimationClip.Name;
                if (type == 2) {
                    if (parseInt(this.AnimationClip.ClipFrameStart) < parseInt(currPNode.ClipFrameStart) ||
                        parseInt(this.AnimationClip.ClipFrameStart) > parseInt(currPNode.ClipFrameEnd)) {
                        this.$alert('帧号超出父节点范围，请检查', '警告', { type: 'error' });
                        this.AnimationClip.ClipFrameStart = '';
                    } else if (
                        parseInt(this.AnimationClip.ClipFrameEnd) > parseInt(currPNode.ClipFrameEnd) ||
                        parseInt(this.AnimationClip.ClipFrameEnd) < parseInt(currPNode.ClipFrameStart)) {
                        this.$alert('帧号超出父节点范围，请检查', '警告', { type: 'error' });
                        this.AnimationClip.ClipFrameEnd = '';
                    } else if (this.AnimationClip.ClipFrameEnd != '' && parseInt(this.AnimationClip.ClipFrameStart) >= parseInt(this.AnimationClip.ClipFrameEnd)) {
                        this.$alert('结束帧不能小于起始帧，请检查', '警告', { type: 'error' });
                        this.AnimationClip.ClipFrameEnd = '';
                    } else if (parseInt(this.AnimationClip.ClipFrameStart) < 0) {
                        this.$alert('起始帧不能为负，请检查', '警告', { type: 'error' });
                        this.AnimationClip.ClipFrameStart = '';
                    } else if (parseInt(this.AnimationClip.ClipFrameEnd) < 0) {
                        this.$alert('结束帧不能为负，请检查', '警告', { type: 'error' });
                        this.AnimationClip.ClipFrameEnd = '';
                    } else {
                        //处理label
                        currNode.ClipFrameStart = this.AnimationClip.ClipFrameStart;
                        currNode.ClipFrameEnd = this.AnimationClip.ClipFrameEnd;
                        currNode.label = '[' + this.AnimationClip.ClipFrameStart + '-' + this.AnimationClip.ClipFrameEnd + ']' + this.AnimationClip.Name;
                    }
                }

                // 速度单独处理
                //currNode.Speed = this.AnimationClip.Speed;
                //处理三个radio
                currNode.TriggerObject.TriggerRadio = this.AnimationClip.TriggerObject.TriggerRadio;
                currNode.TriggerObject.AndObjects.AndRadio = this.AnimationClip.TriggerObject.AndObjects.AndRadio;
                currNode.TriggerObject.OrObjects.OrRadio = this.AnimationClip.TriggerObject.OrObjects.OrRadio;

                //根据radio的数值，判断向对应的触发目标写入数据，或者将其置空，节省篇幅，全部使用三目运算
                currNode.TriggerObject.SingleObject = currNode.TriggerObject.TriggerRadio == '1' ? this.AnimationClip.TriggerObject.SingleObject : '';
                currNode.TriggerObject.AndObjects.NoSqcObjects = currNode.TriggerObject.AndObjects.AndRadio == 1 ? this.AnimationClip.TriggerObject.AndObjects.NoSqcObjects : '';
                currNode.TriggerObject.AndObjects.SqcObject1 = currNode.TriggerObject.AndObjects.AndRadio == 2 ? this.AnimationClip.TriggerObject.AndObjects.SqcObject1 : '';
                currNode.TriggerObject.AndObjects.SqcObject2 = currNode.TriggerObject.AndObjects.AndRadio == 2 ? this.AnimationClip.TriggerObject.AndObjects.SqcObject2 : '';
                currNode.TriggerObject.OrObjects.NoSqcObjects = currNode.TriggerObject.OrObjects.OrRadio == 1 ? this.AnimationClip.TriggerObject.OrObjects.NoSqcObjects : '';
                currNode.TriggerObject.OrObjects.SqcObject1 = currNode.TriggerObject.OrObjects.OrRadio == 2 ? this.AnimationClip.TriggerObject.OrObjects.SqcObject1 : '';
                currNode.TriggerObject.OrObjects.SqcObject2 = currNode.TriggerObject.OrObjects.OrRadio == 2 ? this.AnimationClip.TriggerObject.OrObjects.SqcObject2 : '';
            }
            //当前节点数据更新到树中
            this.$refs.vuetree.setCurrentNode(currNode);

            //树节点更新后，更新“片段信息”表
            this.updateClipTable()
        },

        //控制速度：如果id<1000,就是大片段
        //大片段的速度设置后，其包含的所有子片段速度均同步调整
        speedChange() {
            currNode.Speed = this.AnimationClip.Speed;
            if (currNode.id < 1000) {
                currNode.children.forEach(element => {
                    element.Speed = this.AnimationClip.Speed;
                    //this.$refs.vuetree.setCurrentNode(currNode);
                })
            }
            this.$refs.vuetree.setCurrentNode(currNode);
        },
        //片段信息表
        updateClipTable() {
            // 更新前先将其清空
            this.tableData = [];
            for (var i = 0; i < this.treeNodes.length; i++) {
                //从数据模型中最新的数据push进表中
                this.tableData.push({
                    'Name': this.treeNodes[i].Name,
                    'ClipFrameStart': this.treeNodes[i].ClipFrameStart,
                    'ClipFrameEnd': this.treeNodes[i].ClipFrameEnd,
                    'TriggerObject': this.getObjectData(this.treeNodes[i].TriggerObject, 1)
                });
            }
        },

        //事件信息区域的控件数值改变，实时对树节点进行修改
        //本方法的重难点在于事件触发物修改是，何种逻辑下，保留原来的部分数据进行修改，何种逻辑下清除原来的数据，重新写入
        //经过慎重考虑，“单”逻辑和“与”、“或”中的有序逻辑下，触发物体修改，需要部分修改参数表，其他情况则清空
        ctrlEventChange(type) {
            if (currNode != undefined) {
                if (currNode.id < 100000) {
                    //帧号文本框，不超过其父节点片段的起始终止帧号
                    if (parseInt(this.AnimationEvent.FrameNo) < currPNode.ClipFrameStart || parseInt(this.AnimationEvent.FrameNo) > currPNode.ClipFrameEnd) {
                        this.$alert('帧号超出父节点范围，请检查', '警告', { type: 'error' });
                        this.AnimationEvent.FrameNo = '';
                    } else {
                        currNode.label = this.AnimationEvent.FrameNo;
                    }
                } else {
                    if (type == 2) {
                        //对事件目标控件、参数表值改变的判断
                        //加一个type==2纯粹减少方法执行时，对此部分重复赋值和判断操作

                        currNode.TargetObject.TypeRadio = this.AnimationEvent.TargetObject.TypeRadio;
                        currNode.TargetObject.SingleObject = this.AnimationEvent.TargetObject.SingleObject;

                        currNode.TargetObject.AndObjects.AndRadio = this.AnimationEvent.TargetObject.AndObjects.AndRadio;
                        currNode.TargetObject.AndObjects.NoSqcObjects = this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects;
                        currNode.TargetObject.AndObjects.SqcObject1 = this.AnimationEvent.TargetObject.AndObjects.SqcObject1;
                        currNode.TargetObject.AndObjects.SqcObject2 = this.AnimationEvent.TargetObject.AndObjects.SqcObject2;

                        currNode.TargetObject.OrObjects.OrRadio = this.AnimationEvent.TargetObject.OrObjects.OrRadio;
                        currNode.TargetObject.OrObjects.NoSqcObjects = this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects;
                        currNode.TargetObject.OrObjects.SqcObject1 = this.AnimationEvent.TargetObject.OrObjects.SqcObject1;
                        currNode.TargetObject.OrObjects.SqcObject2 = this.AnimationEvent.TargetObject.OrObjects.SqcObject2;

                        //this.targetData = [];
                        //处理触发目标
                        switch (currNode.TargetObject.TypeRadio) {
                            case 1: //单
                                //将与、或的输入框先清空
                                //this.AnimationEvent.TargetObject.SingleObject = '';
                                this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
                                this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';

                                if (this.targetData.length == 1 && (this.targetData[0].StartValue != '默认' || this.targetData[0].EndValue != '')) {
                                    //如果文本框不为空，参数表中有数据，执行修改，不替换参数值
                                    this.targetData[0].Target = currNode.TargetObject.SingleObject;
                                } else {
                                    // 如果为空，则先把参数表清空，再将当前触发物体生成一条参数，起始值给默认
                                    this.targetData = [];
                                    this.updateTargetTable(currNode.TargetObject.SingleObject, '默认', '');
                                }
                                break;
                            case 2: //与
                                switch (currNode.TargetObject.AndObjects.AndRadio) {
                                    case 1:
                                        this.AnimationEvent.TargetObject.SingleObject = '';
                                        //this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
                                        this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                        this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                        this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                        this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                        this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';

                                        //判断：修改一个目标或者新建一个目标并替换存在的另一个目标，存在困难，暂未处理
                                        //前期版本，输入框改变后直接先清空参数表，再填充
                                        //新需求中要求修改部分目标时判断参数是否保留，逻辑判断太复杂，商讨后不做，仍采用此方式
                                        this.targetData = [];
                                        var targets = currNode.TargetObject.AndObjects.NoSqcObjects.split(',');
                                        targets.forEach(element => {
                                            this.updateTargetTable(element, '默认', '');
                                        });
                                        break;
                                    case 2:
                                        this.AnimationEvent.TargetObject.SingleObject = '';
                                        this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
                                        //this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                        //this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                        this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                        this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                        this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';

                                        //后期版本调用对目标参数表处理的方法
                                        if (currNode.TargetObject.AndObjects.SqcObject1 != '' && currNode.TargetObject.AndObjects.SqcObject2 != '') {
                                            var pos2 = currNode.TargetObject.AndObjects.SqcObject1.lastIndexOf('_');
                                            if (pos2 == -1) {
                                                this.$alert('目标对象名不符合规范，尾部编号数字与前面部分必须下划线隔开', '提示', { type: 'warning' });
                                                this.targetData = [];
                                            } else {
                                                /**
                                                 * 判断表中是否有序并且是否与新输入的有序对象为同一系列
                                                 * 1、如果表中只有一行数据，则一定不是有序对象
                                                 * 2、判断表中对象名是否满足规则：xxx4aefe2323_fe43gargXxx_09
                                                 * 3、判断表中对象与输入的对象名除结尾数字外的前缀是否一致
                                                 * 4、判断表中对象的个数，与其首尾编号差值是否匹配，比如 obj1,obj2,obj5为非有序对象
                                                 *
                                                 *
                                                 * 此部分在“结构认知”中做了优化调整，可参照优化
                                                 *
                                                 */
                                                //重新判断：如果满足规则如何，否则全部清空
                                                if (this.targetData.length > 1) {
                                                    //分别截取目标物体的名称和编号
                                                    var pos1 = this.targetData[0].Target.lastIndexOf('_');
                                                    var prefix1 = this.targetData[0].Target.substring(0, pos1);
                                                    var prefix2 = currNode.TargetObject.AndObjects.SqcObject1.substring(0, pos2);
                                                    var num1 = parseInt(this.targetData[0].Target.substring(pos1 + 1, this.targetData[0].Target.length));
                                                    var num2 = parseInt(this.targetData[this.targetData.length - 1].Target.substring(pos1 + 1, this.targetData[0].Target.length));
                                                    if (pos1 != -1 && prefix1 == prefix2 && (num2 - num1 + 1) == this.targetData.length) {
                                                        // 满足有序规则，如果数据起始和截至物体有了变化，则参数表中进行增加或减少行，已经输入的数据保留，避免丢失和重填
                                                        this.changeTargetdataSqc(currNode.TargetObject.AndObjects.SqcObject1, currNode.TargetObject.AndObjects.SqcObject2);
                                                    } else {
                                                        //如果不满足，则清空，再填充数据
                                                        this.targetData = [];
                                                        var targets = this.sqcObject(currNode.TargetObject.AndObjects.SqcObject1, currNode.TargetObject.AndObjects.SqcObject2);
                                                        if (targets != undefined) {
                                                            targets.forEach(element => {
                                                                this.updateTargetTable(element, '默认', '');
                                                            });
                                                        }
                                                    }
                                                } else {
                                                    //不满足有序
                                                    this.targetData = [];
                                                    var targets = this.sqcObject(currNode.TargetObject.AndObjects.SqcObject1, currNode.TargetObject.AndObjects.SqcObject2);
                                                    if (targets != undefined) {
                                                        targets.forEach(element => {
                                                            this.updateTargetTable(element, '默认', '');
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                }
                                break;
                            case 3: //或
                                switch (currNode.TargetObject.OrObjects.OrRadio) {
                                    case 1: //无序
                                        this.AnimationEvent.TargetObject.SingleObject = '';
                                        this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
                                        this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                        this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                        //this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                        this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                        this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';

                                        this.targetData = [];
                                        var targets = currNode.TargetObject.OrObjects.NoSqcObjects.split(',');
                                        targets.forEach(element => {
                                            this.updateTargetTable(element, '默认', '');
                                        });
                                        break;
                                    case 2: //有序
                                        this.AnimationEvent.TargetObject.SingleObject = '';
                                        this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
                                        this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
                                        this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
                                        this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
                                        //this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
                                        //this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';

                                        //后期版本调用对目标参数表处理的方法
                                        //此处的处理与上面与逻辑中相同，需要重构，可参考“结构认知”，但不可照搬
                                        if (currNode.TargetObject.OrObjects.SqcObject1 != '' && currNode.TargetObject.OrObjects.SqcObject2 != '') {
                                            var pos2 = currNode.TargetObject.OrObjects.SqcObject1.lastIndexOf('_');
                                            if (pos2 == -1) {
                                                this.$alert('目标对象名不符合规范，尾部编号数字与前面部分必须下划线隔开', '提示', { type: 'warning' });
                                                this.targetData = [];
                                            } else {
                                                /**
                                                 * 判断表中是否有序并且是否与新输入的有序对象为同一系列
                                                 * 1、如果表中只有一行数据，则一定不是有序对象
                                                 * 2、判断表中对象名是否满足规则：xxx4aefe2323_fe43gargXxx_09
                                                 * 3、判断表中对象与输入的对象名除结尾数字外的前缀是否一致
                                                 * 4、判断表中对象的个数，与其首尾编号差值是否匹配，比如 obj1,obj2,obj5为非有序对象
                                                 */
                                                //重新判断：如果满足规则如何，否则全部清空
                                                if (this.targetData.length > 1) {
                                                    var pos1 = this.targetData[0].Target.lastIndexOf('_');
                                                    var prefix1 = this.targetData[0].Target.substring(0, pos1);
                                                    var prefix2 = currNode.TargetObject.OrObjects.SqcObject1.substring(0, pos2);
                                                    var num1 = parseInt(this.targetData[0].Target.substring(pos1 + 1, this.targetData[0].Target.length));
                                                    var num2 = parseInt(this.targetData[this.targetData.length - 1].Target.substring(pos1 + 1, this.targetData[0].Target.length));
                                                    if (pos1 != -1 && prefix1 == prefix2 && (num2 - num1 + 1) == this.targetData.length) {
                                                        //满足有序
                                                        this.changeTargetdataSqc(currNode.TargetObject.OrObjects.SqcObject1, currNode.TargetObject.OrObjects.SqcObject2);
                                                    } else {
                                                        // 不满足有序
                                                        this.targetData = [];
                                                        var targets = this.sqcObject(currNode.TargetObject.OrObjects.SqcObject1, currNode.TargetObject.OrObjects.SqcObject2);
                                                        if (targets != undefined) {
                                                            targets.forEach(element => {
                                                                this.updateTargetTable(element, '默认', '');
                                                            });
                                                        }
                                                    }
                                                } else {
                                                    //不满足有序
                                                    this.targetData = [];
                                                    var targets = this.sqcObject(currNode.TargetObject.OrObjects.SqcObject1, currNode.TargetObject.OrObjects.SqcObject2);
                                                    if (targets != undefined) {
                                                        targets.forEach(element => {
                                                            this.updateTargetTable(element, '默认', '');
                                                        });
                                                    }
                                                }
                                            }
                                        }

                                        break;
                                }
                                break;
                        }
                    }

                    //更新dotw部分数据
                    currNode.DurationMinute = this.AnimationEvent.DurationMinute;
                    currNode.DurationSecond = this.AnimationEvent.DurationSecond;
                    currNode.PlayType = this.AnimationEvent.PlayType;
                    currNode.LoopType = this.AnimationEvent.LoopType;
                    currNode.LoopTimes = this.AnimationEvent.LoopTimes;

                    if (this.targetData.length > 0) {
                        currNode.TargetData = this.targetData;
                    }

                }

                this.$refs.vuetree.setCurrentNode(currNode);
            }

        },

        //在有序目标情况下，比如当前名称为 obj_05——obj_07，如果修改起止的对象为obj_01——obj_09，又要保留还留在范围内的对象，在此进行处理
        changeTargetdataSqc(obj1, obj2) {
            //取得起始终止对象的数字
            //有序对象的命名规则最新：xxx_21_xx_01，xxx_21_xx_09
            var ctrlNumStart = parseInt(obj1.split('_').pop());
            var ctrlNumEnd = parseInt(obj2.split('_').pop());
            //取得参数表数据的起始终止对象的数字
            var tableNumStart = parseInt(this.targetData[0].Target.split('_').pop());
            var tableNumEnd = parseInt(this.targetData[this.targetData.length - 1].Target.split('_').pop());
            //取得起始终止对象除数字外的前缀
            var objStartPrefix = obj1.replace(ctrlNumStart, '');
            var objEndPrefix = obj2.replace(ctrlNumEnd, '');
            if (objStartPrefix != objEndPrefix) {
                this.$alert('有序对象1和对象2的名称前缀不一致，请检查', '提示', { type: 'warning' });
            } else {
                //名称前缀一致
                if (this.targetData.length == 1 && this.targetData[0].Target == '') {
                    //根据起始值，生成有序数组
                    var targets = this.sqcObject(obj1, obj2);
                    this.targetData = [];
                    if (targets != undefined) {
                        //向参数表填入数据
                        targets.forEach(element => {
                            this.updateTargetTable(element, '默认', '');
                        });
                    }
                } else {
                    //有序起始目标数值
                    var diff = ctrlNumStart - tableNumStart
                    if (diff > 0) {
                        //新的数值必原有数值大，则表中需要删除一部分
                        for (var i = 0; i < diff; i++) {
                            this.targetData.splice(0, 1);
                        }
                    } else if (diff < 0) {
                        //新的数值比原有的小，追加
                        for (var i = 0; i < Math.abs(diff); i++) {
                            this.targetData.splice(i, 0, { 'seen': false, 'Target': objStartPrefix + (ctrlNumStart + i), "StartValue": '默认', 'EndValue': '' });
                        }
                    } else {
                        // diff == 0什么都不做
                    }

                    //有结束目标数值
                    var diff = ctrlNumEnd - tableNumEnd
                    if (diff < 0) {
                        // 新的数值必原有的小，删除
                        for (var i = 0; i < Math.abs(diff); i++) {
                            this.targetData.splice(-1, 1);
                        }
                    } else if (diff > 0) {
                        //追加
                        for (var i = 0; i < diff; i++) {
                            this.targetData.push({ 'seen': false, 'Target': objStartPrefix + (tableNumEnd + 1 + i), "StartValue": '默认', 'EndValue': '' });
                        }
                    } else {
                        // diff == 0什么都不做
                    }
                }
            }

        },

        //更新目标数值表
        updateTargetTable(target, start, end) {
            this.targetData.push({ 'seen': false, 'Target': target, "StartValue": start, 'EndValue': end });
        },

        //清空事件区域控件中数值
        blankCtrl() {
            this.AnimationEvent.ClassName = '';
            this.AnimationEvent.MethodName = '';
            this.AnimationEvent.TargetObject.TypeRadio = 0;
            this.AnimationEvent.TargetObject.AndObjects.AndRadio = 0;
            this.AnimationEvent.TargetObject.OrObjects.OrRadio = 0;
            this.AnimationEvent.TargetObject.SingleObject = '';
            this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects = '';
            this.AnimationEvent.TargetObject.AndObjects.SqcObject1 = '';
            this.AnimationEvent.TargetObject.AndObjects.SqcObject2 = '';
            this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = '';
            this.AnimationEvent.TargetObject.OrObjects.SqcObject1 = '';
            this.AnimationEvent.TargetObject.OrObjects.SqcObject2 = '';
            this.targetData = [{ 'seen': false, 'Target': '', "StartValue": '默认', 'EndValue': '' }]
        },


        //触发对象有序时处理
        sqcObject(objStart, objEnd) {
            var Objects = [];
            //旧的截取对象编号不适用了
            // var numStart = objStart.replace(/[^0-9]/ig, '');
            // var numEnd = objEnd.replace(/[^0-9]/ig, '');
            var pos = objStart.lastIndexOf('_');
            var numStart = parseInt(objStart.substring(pos + 1, objStart.length));
            var numEnd = parseInt(objEnd.substring(pos + 1, objEnd.length));
            var objStartPrefix = objStart.substring(0, pos + 1);
            var objEndPrefix = objEnd.substring(0, pos + 1);
            if (objStartPrefix == objEndPrefix) {
                if (numStart >= numEnd) {
                    this.$alert('起始对象和结束对象编号有误', '警告', { type: 'error' });
                } else {
                    for (var i = numStart; i <= numEnd; i++) {
                        //对象的名称中编号为_01、_02..._09、_10
                        //Objects.push(objEndPrefix + i);
                        Objects.push(objEndPrefix + (i <= 9 ? '0' + i : i));
                    }
                }
                //Objects = Objects.substr(0, Objects.length - 1);
                return Objects;
            } else {
                this.$alert('有序对象1和对象2的名称前缀不一致，请检查', '提示', { type: 'warning' });
            }

        },


        //输入框获得焦点后变更对应单选框（单与或），因此不必去手工勾选单选框
        //type=0(片段)，type=1(事件)
        focusMainRadio(type, radioNum) {
            if (type == 0) {
                this.AnimationClip.TriggerObject.TriggerRadio = radioNum;
                if (radioNum == 1) {
                    this.AnimationClip.TriggerObject.AndObjects.AndRadio = 0;
                    this.AnimationClip.TriggerObject.OrObjects.OrRadio = 0;
                }
            } else {
                this.AnimationEvent.TargetObject.TypeRadio = radioNum;
                if (radioNum == 1) {
                    this.AnimationEvent.TargetObject.AndObjects.AndRadio = 0;
                    this.AnimationEvent.TargetObject.OrObjects.OrRadio = 0;
                }
            }

        },
        //输入框获得焦点后变更对应单选框（无序、有序）
        //type=0(片段)，type=1(事件)
        focusSubRadio(type, radioNum) {
            if (type == 0) {
                if (this.AnimationClip.TriggerObject.TriggerRadio == 2) {
                    this.AnimationClip.TriggerObject.AndObjects.AndRadio = radioNum;
                    this.AnimationClip.TriggerObject.OrObjects.OrRadio = 0;
                } else {
                    this.AnimationClip.TriggerObject.OrObjects.OrRadio = radioNum;
                    this.AnimationClip.TriggerObject.AndObjects.AndRadio = 0;
                }
            } else {
                if (this.AnimationEvent.TargetObject.TypeRadio == 2) {
                    this.AnimationEvent.TargetObject.AndObjects.AndRadio = radioNum;
                    this.AnimationEvent.TargetObject.OrObjects.OrRadio = 0;
                } else {
                    this.AnimationEvent.TargetObject.OrObjects.OrRadio = radioNum;
                    this.AnimationEvent.TargetObject.AndObjects.AndRadio = 0;
                }
            }


        },

        /**
         * 事件类名、方法名二级联动
         * 两种情况：新建事件时，选择class后，默认取第一个method
         *          从树节点上点击事件时，class直接被更新，再根据class值，查询其children
         *          即方法集合，再从方法集合中查method传递过来的值
         * 方法的更新还需要将对应的模块权限也刷新
         * @param {*} value class名
         * @param {*} methodCode 方法名
         */
        selectChange(value, methodCode) {
            if (currNode != undefined && currNode.id > 100000) {
                //根据传递进来的value查找类名对象，应当唯一
                currClass = this.AnimationEvent.OptionItems.filter(function(p) {
                    return p.code === value;
                });
                //clsText用于树节点事件label中的class
                clsText = currClass[0].text;
                currNode.ClassName = value;
                //NewMethodName数组为class下所有的方法
                this.AnimationEvent.NewMethodName = currClass[0].children;

                if (methodCode == '' || methodCode == undefined) {
                    //数据模型的MethodName取code
                    this.AnimationEvent.MethodName = this.AnimationEvent.NewMethodName[0].code;
                    //配置三块功能区权限
                    var obj = this.AnimationEvent.NewMethodName[0].obj;
                    var par = this.AnimationEvent.NewMethodName[0].par;
                    var dotw = this.AnimationEvent.NewMethodName[0].dotw;
                    //树节点上label中方法名称，以及
                    mtdText = this.AnimationEvent.NewMethodName[0].text;
                    currNode.MethodName = this.AnimationEvent.NewMethodName[0].code;
                } else {
                    currMethod = this.AnimationEvent.NewMethodName.filter(function(p) {
                        return p.code === methodCode;
                    });
                    if (currMethod.length == 0) {
                        this.$alert('方法名不存在，请核对', '警告', { type: 'error' });
                        mtdText = methodCode;
                    } else {
                        //取得方法code和text
                        currNode.MethodName = currMethod[0].code;
                        mtdText = currMethod[0].text;
                        // 下面三个参数处理控件禁用
                        //根据设计，部分方法限制触发目标、参数表、dotw的使用，因此根据此三个参数进行相应禁用
                        //因规则与杨帆未讨论定论，目前所有的方法这三个参数都未进行限制，均放行
                        var obj = currMethod[0].obj;
                        var par = currMethod[0].par;
                        var dotw = currMethod[0].dotw;
                    }
                }

                //选择类和方法后，才允许操作下面内容，控件激活
                this.eventCtrlDisable.radioMain = false;
                this.eventCtrlDisable.singleObj = false;
                this.eventCtrlDisable.nonSingleObj = false;
                this.eventCtrlDisable.par = false;
                this.eventCtrlDisable.dotw = false;

                //根据obj, par, dotw限制控件
                this.setCtrlDisable(obj, par, dotw);
                //根据类的text和方法的text更新树节点中的label
                this.updateTreeEventNode(clsText, mtdText);
                this.$refs.vuetree.setCurrentNode(currNode);
                //结尾将方法的code置为null，以免传递给后面的操作
                methodCode = undefined;
            }
        },
        //方法名改变事件
        methodSelectChange(code) {
            currNode.MethodName = code;
            this.$refs.vuetree.setCurrentNode(currNode);
            //从方法名数组中查找
            currMethod = currClass[0].children.find((item) => {
                return item.code === code;
            });
            // 赋值3个控件限制参数
            var obj = currMethod.obj;
            var par = currMethod.par;
            var dotw = currMethod.dotw;
            this.setCtrlDisable(obj, par, dotw);
            mtdText = currMethod.text;
            //根据类的text和方法的text更新树节点中的label
            this.updateTreeEventNode(clsText, mtdText);
        },
        //下拉框值改变后，刷新事件在树节点的label
        updateTreeEventNode(className, methodName) {
            currNode.label = className + '-' + methodName;
            this.$refs.vuetree.setCurrentNode(currNode);
        },

        //根据方法参数中的配置，事件信息区域禁用部分控件
        setCtrlDisable(obj, par, dotw) {
            //禁用包括两部分，左侧的流程糖葫芦串和右边对应的控件
            //设置禁用和启用两种颜色，用于流程图
            var disableColor = 'gray';
            var enableColor = 'darkturquoise';

            switch (obj) {
                //触发目标三个逻辑下的控件
                case 0:
                    this.$refs.refEventTarget.style.background = disableColor;
                    this.eventCtrlDisable.radioMain = true;
                    this.eventCtrlDisable.singleObj = true;
                    this.eventCtrlDisable.nonSingleObj = true;
                    break;
                case 1:
                    this.$refs.refEventTarget.style.background = enableColor;
                    this.eventCtrlDisable.radioMain = false;
                    this.eventCtrlDisable.singleObj = false;
                    this.eventCtrlDisable.nonSingleObj = true;
                    break;
                case 2:
                    this.$refs.refEventTarget.style.background = enableColor;
                    this.eventCtrlDisable.radioMain = false;
                    this.eventCtrlDisable.singleObj = false;
                    this.eventCtrlDisable.nonSingleObj = false;
                    break;
            }
            switch (par) {
                // 参数表
                case 0:
                    this.$refs.refEventValueArray.style.background = disableColor;
                    this.eventCtrlDisable.par = true;
                    break;
                case 1:
                    this.$refs.refEventValueArray.style.background = enableColor;
                    this.eventCtrlDisable.par = false;
                    break;
                case 2:
                    this.$refs.refEventValueArray.style.background = enableColor;
                    this.eventCtrlDisable.par = false;
                    break;
            }

            switch (dotw) {
                //事件区最底下四项
                case 0:
                    this.$refs.refEventTimeElapsed.style.background = disableColor;
                    this.$refs.refEventSlowMotion.style.background = disableColor;
                    this.$refs.refEventLoop.style.background = disableColor;
                    this.$refs.refEventTimes.style.background = disableColor;
                    this.eventCtrlDisable.dotw = true;
                    break;
                case 1:
                    this.$refs.refEventTimeElapsed.style.background = enableColor;
                    this.$refs.refEventSlowMotion.style.background = enableColor;
                    this.$refs.refEventLoop.style.background = enableColor;
                    this.$refs.refEventTimes.style.background = enableColor;
                    this.eventCtrlDisable.dotw = false;
                    break;
            }

        },
        //增加树节点
        append(data, type) {
            var newChild;
            if (type == 0) {
                //增加片段
                newChild = {
                    id: 1000 + id++,
                    label: '新片段',
                    Name: '', //片段名称
                    ClipFrameStart: '', //起始帧
                    ClipFrameEnd: '', //结束帧
                    Speed: data.Speed, //速度
                    TriggerObject: { //触发物体属性——单|与|或
                        TriggerRadio: '',
                        SingleObject: '', //单
                        AndObjects: { //与
                            AndRadio: '',
                            NoSqcObjects: '',
                            SqcObject1: '',
                            SqcObject2: ''
                        },
                        OrObjects: { //或
                            OrRadio: '',
                            NoSqcObjects: '',
                            SqcObject1: '',
                            SqcObject2: ''
                        }
                    },
                    TriggerObjectMove: '',
                    Object: '',
                    children: []
                }
            } else if (type == 1) {
                //增加帧
                newChild = {
                    id: 10000 + id++,
                    label: '新帧'
                }
            } else if (type == 2) {
                //增加事件
                newChild = {
                    id: 100000 + id++,
                    label: '新事件',
                    ClassName: '', //类名
                    MethodName: '', //方法名
                    TargetObject: { //目标物体
                        TypeRadio: '',
                        SingleObject: '',
                        AndObjects: {
                            AndRadio: '',
                            NoSqcObjects: '',
                            SqcObject1: '',
                            SqcObject2: ''
                        },
                        OrObjects: {
                            OrRadio: '',
                            NoSqcObjects: '',
                            SqcObject1: '',
                            SqcObject2: ''
                        }
                    },
                    // TargetData: {
                    //     Target: [],
                    //     EndValue: []
                    // }, //数值
                    TargetData: [],
                    DurationMinute: 0, //时长分
                    DurationSecond: 0, //时长秒
                    PlayType: '', //播放类型
                    LoopType: '', //循环类型
                    LoopTimes: '', //循环次数
                }
            } else {
                //增加大片段
                newChild = '';
                var newBrother = {
                    id: 100 + id++,
                    label: '新部分',
                    Name: '', //片段名称
                    ClipFrameStart: '', //起始帧
                    ClipFrameEnd: '', //结束帧
                    Speed: 1.0, //速度
                    TriggerObject: { //触发物体属性——单|与|或
                        TriggerRadio: '',
                        SingleObject: '',
                        AndObjects: {
                            AndRadio: '',
                            NoSqcObjects: '',
                            SqcObject1: '',
                            SqcObject2: ''
                        },
                        OrObjects: {
                            OrRadio: '',
                            NoSqcObjects: '',
                            SqcObject1: '',
                            SqcObject2: ''
                        }
                    },
                    Object: '',
                    children: []
                }
                this.treeNodes.push(JSON.parse(JSON.stringify(newBrother)))
            }

            if (newChild != '') {
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            }

        },

        //删除树节点
        remove(node, data) {
            this.$confirm('此操作将删除 “' + data.label + '” , 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //删除操作
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },


        //可编辑表格
        loseFcous(index, row) {
            row.seen = false;
            //数据在此更新到树中，不调用ctrlEventChange（调用传currNode过去无法接受修改值）
            currNode.TargetData = this.targetData;
            this.$refs.vuetree.setCurrentNode(currNode);
        },
        cellClick(row, column) {
            row.seen = true;
        },

        //坑人玩意，input无法输入，加入本事件后强制更新
        //后检查为模型绑定错误，据说在某些情况下，控件嵌套太多，或出现无法输入，可用此强制刷新
        change(e) {
            this.$forceUpdate();
        },

        //导出文件
        //doc为拼接好的字符串，file为文件名
        exportData(doc, file) {
            var blob = new Blob([doc], { type: "text/plain;charset=utf-8" });
            saveAs(blob, file);
        },

        //加载文件
        loadJsonFile(file, fileList) {
            if (fileList) {
                for (var i = 0; i < fileList.length; i++) {
                    var file = fileList[i]
                    impFileName = file.name;
                    if (!file) continue
                    var reader = new FileReader()
                    reader.onload = async(e) => {
                        var content = e.target.result;

                        //截取底部的AnimationInit信息，全部照搬到新文件中
                        var pos1 = content.indexOf('<AnimationInit>');
                        var pos2 = content.indexOf('  </AnimationInit>');
                        //animationInit = content.substring(pos1 + 18, pos2 - 2)
                        animationInit = content.substring(pos1 + 15, pos2 - 1);

                        //检查文件头部的xmlns，如有则加上
                        pos1 = content.indexOf('xmlns')
                        if (pos1 != -1) {
                            xmlns = 'xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance';
                        }

                        //读取xml并转为tree
                            var jsonObj = xml2Json(content);
                        this.json2Tree(jsonObj);

                        //如果是本项目生成的Json，可直接绑定
                        //var data = JSON.parse(e.target.result);
                        // this.treeNodes = data.TreeNodes;
                        // this.ModelObject.AnimationName = data.AnimationName;
                        // this.ModelObject.CameraName = data.CameraName;
                        // this.ModelObject.AnimationModel = data.AnimationModel;
                        // this.ModelObject.AnimationContent = data.AnimationContent
                    }
                    reader.readAsText(file.raw)
                }
                this.updateClipTable();
                this.eventCtrlDisable.importBtn = true;
            }
        },

        //将xml转换过来的json数据解析为树
        json2Tree(jsonObj) {

            var model = jsonObj.AnimationConfigure.ModelObject;
            var clip = jsonObj.AnimationConfigure.AnimationClip;
            var stage = jsonObj.AnimationConfigure.AnimationStage.Sort;

            //xml转换为json后，当stage和clip只有一个元素时，格式为对象，非对象数组，强制将它们转为对象数组，以便使用forEach
            stage = forceArr(stage);
            clip = forceArr(clip);

            //主资源包空 —— 目前没有配置
            //附加资源包 —— CameraName
            this.ModelObject.CameraName = model._CameraName;

            this.ModelObject.AnimationModel = model._AnimationName;
            this.ModelObject.AnimationContent = jsonObj.AnimationConfigure._Name;
            //NoAnimation为可选项
            if (model.NoAnimation != undefined) {
                // 检查如为对象强转为Array
                model.NoAnimation = forceArr(model.NoAnimation);
                model.NoAnimation.forEach(element => {
                        this.ModelObject.NoAnimation += element._ModelName + ','
                    })
                    // 删除结尾多余的逗号
                this.ModelObject.NoAnimation = this.ModelObject.NoAnimation.substr(0, this.ModelObject.NoAnimation.length - 1);
            }

            this.treeNodes = [];
            // 将id置零，使导入xml文件时第一个根节点上可以添加根节点
            id = 0;
            stage.forEach((element, index) => {
                //element._Index
                // 最先解析stage数据，根据其起始结束帧来确定其子片段
                var frame = element._ClipFrame.split('_')
                var starFrame = frame[0];
                var endFrame = frame[1];

                //处理片段表
                var node = {
                    'id': id++ + 1,
                    'label': '[' + starFrame + '-' + endFrame + ']' + element._GroupName,
                    //'label': element._GroupName,
                    'Name': element._GroupName,
                    'ClipFrameStart': starFrame,
                    'ClipFrameEnd': endFrame,
                    'Speed': 1
                }
                var triggerArr = this.splitTriggerObject(element._TriggerObject).split('&');
                this.computeTriggerObject(node, triggerArr)
                node['children'] = [];

                //处理片段
                if (clip != undefined) {
                    //因为中间要跳出循环，所以不能使用forEach，帧号需转换为数字
                    for (var index = 0; index < clip.length; index++) {
                        var clipFrame = clip[index]._ClipFrame.split('_');
                        var startClipFrame = clipFrame[0];
                        var endClipFrame = clipFrame[1];
                        if (parseInt(startClipFrame) >= parseInt(starFrame) && parseInt(endClipFrame) <= parseInt(endFrame)) {
                            // 判断起始结束帧与父级关系，是否在父级范围内
                            // 片段的id给的较大，避免重复
                            var clipNode = {
                                    'id': 1500 + id++,
                                    'label': '[' + startClipFrame + '-' + endClipFrame + ']' + clip[index]._Name,
                                    'Name': clip[index]._Name,
                                    'ClipFrameStart': startClipFrame,
                                    'ClipFrameEnd': endClipFrame,
                                    'Speed': parseFloat(clip[index]._Speed),
                                    'TriggerObjectMove': clip[index]._TriggerObjectMove
                                }
                                // 分割触发物
                            var triggerClipArr = this.splitTriggerObject(clip[index]._TriggerObject).split('&');
                            //根据分割的触发物，来计算对应的逻辑
                            this.computeTriggerObject(clipNode, triggerClipArr);
                            clipNode['children'] = [];


                            //处理帧和事件
                            var events = forceArr(clip[index].Event);
                            var preNode = { 'id': '', 'label': '', 'children': [] };
                            var currEventNode = [];
                            if (events != undefined) {
                                var i = -1;
                                events.forEach((element, index) => {
                                    // event数据样本在xml中<Event Content="160_UI_ImageColor_#objTestImage#obj#par00FF00#par#dotw0.8#1#1#0#dotw" />
                                    //解析成json后为"160_UI_ImageColor_#objTestImage#obj#par00FF00#par#dotw0.8#1#1#0#dotw"
                                    //可能缺少#以后的部分，obj、par、dotw不一定全面
                                    var pos = element._Content.indexOf('#');
                                    var eventData = '';
                                    if (pos == -1) {
                                        //只有帧号和类、方法名
                                        eventData = element._Content.substring(0, element._Content.length - 1).split('_');
                                    } else {
                                        eventData = element._Content.substring(0, pos - 1).split('_');
                                    }
                                    //此处似应该写在上面的else中，无时间验证了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                                    eventData.splice(3, 1, element._Content.substring(pos, element._Content.length))
                                    var frameNumNode = {
                                        'id': 15000 + id++,
                                        'label': eventData[0],
                                        'children': []
                                    };

                                    //处理事件
                                    //preNode存储前一个帧，如果当前帧名与其一致，则事件合并到preNode
                                    var eventNode = {
                                        'id': 150000 + id++,
                                        'ClassName': eventData[1],
                                        'MethodName': eventData[2],
                                        'label': getLabel(eventData[1], eventData[2])
                                    }

                                    //事件目标、数值、dotw
                                    //解析目标
                                    var targetObjectArr = getTargetDatas(eventData[3], '#obj');
                                    var targetValueCtrls = null;
                                    if (targetObjectArr != 'unfind') {
                                        targetValueCtrls = this.splitTriggerObject(targetObjectArr).split('&');
                                    }

                                    //解析数值
                                    //2020.7.14日新修改标准： #par0~5+0+3+5~4#par，调整后单个值表示只有起始值无终止值，0~5表示起始值终止值
                                    var targetValueArr = getTargetDatas(eventData[3], '#par');
                                    if (targetValueArr != 'unfind') {
                                        //var targetValueDatas = this.splitTriggerObject(targetValueArr).split('&');
                                        var targetValueDatas = targetValueArr.split('&');
                                        this.computeTargetObject(eventNode, targetValueCtrls, targetValueDatas);
                                    } else {
                                        this.computeTargetObject(eventNode, targetValueCtrls, undefined);
                                    }

                                    //解析dotw
                                    var targetDotwArr = getTargetDatas(eventData[3], '#dotw');
                                    if (targetDotwArr != 'unfind') {
                                        var targetDotwArrCtrls = targetDotwArr.split('#');
                                        var durationTime = parseFloat(targetDotwArrCtrls[0]);
                                        eventNode['DurationMinute'] = parseInt(durationTime / 60);
                                        eventNode['DurationSecond'] = durationTime % 60;
                                        eventNode['PlayType'] = targetDotwArrCtrls[1];
                                        eventNode['LoopType'] = targetDotwArrCtrls[2];
                                        eventNode['LoopTimes'] = targetDotwArrCtrls[3];
                                    }

                                    //此处的逻辑用于处理一个帧号下面可能存在一个事件或者多个事件的情况
                                    //所以记录了上一个节点数据，用其label与本次比较，两次相同则表明两次事件属于同一个帧
                                    if (preNode.label == frameNumNode.label) {
                                        //一帧多个事件
                                        clipNode.children[i].children.push(eventNode)
                                    } else {
                                        //一帧单个事件
                                        frameNumNode.children.push(eventNode);
                                        clipNode.children.push(frameNumNode);
                                        i++;
                                    }

                                    preNode = frameNumNode;
                                });
                            }


                            node.children.push(clipNode);
                        } else {
                            continue;
                        }
                    }

                }
                //console.log(JSON.stringify(node));
                this.treeNodes.push(node);
            });

            //console.log(JSON.stringify(this.treeNodes));
            this.updateClipTable();
        },

        //解析触发目标，此处的逻辑在“结构认知”中进行了大幅优化，可参照调整
        //主要的功能就是把触发目标投递到对应的与或非逻辑中
        computeTriggerObject(node, triggerArr) {
            if (triggerArr[0] == '1') {
                node['TriggerObject'] = {
                    'TriggerRadio': 1,
                    'SingleObject': triggerArr[1],
                    'AndObjects': {
                        'AndRadio': 0,
                        'NoSqcObjects': '',
                        'SqcObject1': '',
                        'SqcObject2': ''
                    },
                    'OrObjects': {
                        'OrRadio': 0,
                        'NoSqcObjects': '',
                        'SqcObject1': '',
                        'SqcObject2': ''
                    }
                };
            } else if (triggerArr[0] == '2') {
                if (triggerArr[1] == '1') {
                    node['TriggerObject'] = {
                        'TriggerRadio': 2,
                        'SingleObject': '',
                        'AndObjects': {
                            'AndRadio': 1,
                            'NoSqcObjects': triggerArr[2],
                            'SqcObject1': '',
                            'SqcObject2': ''
                        },
                        'OrObjects': {
                            'OrRadio': 0,
                            'NoSqcObjects': '',
                            'SqcObject1': '',
                            'SqcObject2': ''
                        }
                    };
                } else {
                    var sqlObj = triggerArr[2].split(',');
                    node['TriggerObject'] = {
                        'TriggerRadio': 2,
                        'SingleObject': '',
                        'AndObjects': {
                            'AndRadio': 2,
                            'NoSqcObjects': '',
                            'SqcObject1': sqlObj[0],
                            'SqcObject2': sqlObj[sqlObj.length - 1]
                        },
                        'OrObjects': {
                            'OrRadio': 0,
                            'NoSqcObjects': '',
                            'SqcObject1': '',
                            'SqcObject2': ''
                        }
                    };
                }
            } else {
                if (triggerArr[1] == '1') {
                    node['TriggerObject'] = {
                        'TriggerRadio': 3,
                        'SingleObject': '',
                        'AndObjects': {
                            'AndRadio': 0,
                            'NoSqcObjects': '',
                            'SqcObject1': '',
                            'SqcObject2': ''
                        },
                        'OrObjects': {
                            'OrRadio': 1,
                            'NoSqcObjects': triggerArr[2],
                            'SqcObject1': '',
                            'SqcObject2': ''
                        }
                    };
                } else {
                    var sqlObj = triggerArr[2].split(',');
                    node['TriggerObject'] = {
                        'TriggerRadio': 3,
                        'SingleObject': '',
                        'AndObjects': {
                            'AndRadio': 0,
                            'NoSqcObjects': '',
                            'SqcObject1': '',
                            'SqcObject2': ''
                        },
                        'OrObjects': {
                            'OrRadio': 2,
                            'NoSqcObjects': '',
                            'SqcObject1': sqlObj[0],
                            'SqcObject2': sqlObj[sqlObj.length - 1]
                        }
                    };
                }
            }
        },

        //解析目标对象
        computeTargetObject(node, targetArr, valueArr) {
            //var start = '默认'; 原本所有起始值均默认，现在调整
            if (targetArr == undefined) {
                //表示没有目标对象，事件由无对象触发
                node['TargetObject'] = {
                    'TypeRadio': 0,
                    'SingleObject': '',
                    'AndObjects': {
                        'AndRadio': 0,
                        'NoSqcObjects': '',
                        'SqcObject1': '',
                        'SqcObject2': ''
                    },
                    'OrObjects': {
                        'OrRadio': 0,
                        'NoSqcObjects': '',
                        'SqcObject1': '',
                        'SqcObject2': ''
                    }
                };
                if (valueArr != undefined) {
                    //此情况下valueArr只有一个元素
                    var arr = valueArr[0].split('~');
                    node['TargetData'] = [];
                    node['TargetData'].push({
                        'seen': false,
                        'Target': '',
                        "StartValue": arr[0], //start
                        'EndValue': arr.length > 1 ? arr[1] : ''
                    });
                }
            } else {
                if (targetArr[0] == '1') {
                    //表示单目标
                    node['TargetObject'] = {
                        'TypeRadio': 1,
                        'SingleObject': targetArr[1],
                        'AndObjects': {
                            'AndRadio': 0,
                            'NoSqcObjects': '',
                            'SqcObject1': '',
                            'SqcObject2': ''
                        },
                        'OrObjects': {
                            'OrRadio': 0,
                            'NoSqcObjects': '',
                            'SqcObject1': '',
                            'SqcObject2': ''
                        }
                    };
                    if (valueArr != undefined) {
                        //此情况下valueArr只有一个元素
                        var arr = valueArr[0].split('~');
                        node['TargetData'] = [];
                        node['TargetData'].push({
                            'seen': false,
                            'Target': targetArr[1],
                            "StartValue": arr[0], //start
                            'EndValue': arr.length > 1 ? arr[1] : ''
                        });
                    }
                } else if (targetArr[0] == '2') {
                    //表示目标有多个，且为“与”逻辑
                    if (targetArr[1] == '1') {
                        //表示无序目标
                        node['TargetObject'] = {
                            'TypeRadio': 2,
                            'SingleObject': '',
                            'AndObjects': {
                                'AndRadio': 1,
                                'NoSqcObjects': targetArr[2],
                                'SqcObject1': '',
                                'SqcObject2': ''
                            },
                            'OrObjects': {
                                'OrRadio': 0,
                                'NoSqcObjects': '',
                                'SqcObject1': '',
                                'SqcObject2': ''
                            }
                        };
                    } else {
                        //表示有序目标
                        var sqlObj = targetArr[2].split(',');
                        node['TargetObject'] = {
                            'TypeRadio': 2,
                            'SingleObject': '',
                            'AndObjects': {
                                'AndRadio': 2,
                                'NoSqcObjects': '',
                                'SqcObject1': sqlObj[0],
                                'SqcObject2': sqlObj[sqlObj.length - 1]
                            },
                            'OrObjects': {
                                'OrRadio': 0,
                                'NoSqcObjects': '',
                                'SqcObject1': '',
                                'SqcObject2': ''
                            }
                        };
                    }
                    //处理目标参数表，无论有序目标，还是无序目标，统一逻辑
                    if (valueArr != undefined && valueArr[0] != undefined) {
                        var values = valueArr[0].split('+');
                        var targets = targetArr != undefined ? targetArr[2].split(',') : '';
                        node['TargetData'] = [];
                        for (let i = 0; i < values.length; i++) {
                            var arr = values[i].split('~');
                            node['TargetData'].push({
                                'seen': false,
                                'Target': targets[i],
                                "StartValue": arr[0], //start
                                'EndValue': arr.length > 1 ? arr[1] : ''
                            });
                        }
                    }
                } else {
                    //表示目标有多个，且为“或”逻辑
                    if (targetArr[1] == '1') {
                        //表示无序目标
                        node['TargetObject'] = {
                            'TypeRadio': 3,
                            'SingleObject': '',
                            'AndObjects': {
                                'AndRadio': 0,
                                'NoSqcObjects': '',
                                'SqcObject1': '',
                                'SqcObject2': ''
                            },
                            'OrObjects': {
                                'OrRadio': 1,
                                'NoSqcObjects': targetArr[2],
                                'SqcObject1': '',
                                'SqcObject2': ''
                            }
                        };
                    } else {
                        //表示有序目标
                        var sqlObj = targetArr[2].split(',');
                        node['TargetObject'] = {
                            'TypeRadio': 3,
                            'SingleObject': '',
                            'AndObjects': {
                                'AndRadio': 0,
                                'NoSqcObjects': '',
                                'SqcObject1': '',
                                'SqcObject2': ''
                            },
                            'OrObjects': {
                                'OrRadio': 2,
                                'NoSqcObjects': '',
                                'SqcObject1': sqlObj[0],
                                'SqcObject2': sqlObj[sqlObj.length - 1]
                            }
                        };
                    }
                    if (valueArr != undefined && valueArr[0] != undefined) {
                        var values = valueArr[0].split('|');
                        var targets = targetArr != undefined ? targetArr[2].split(',') : '';
                        node['TargetData'] = [];
                        for (let i = 0; i < values.length; i++) {
                            var arr = values[i].split('~');
                            node['TargetData'].push({
                                'seen': false,
                                'Target': targets[i],
                                "StartValue": arr[0], //start
                                'EndValue': arr.length > 1 ? arr[1] : ''
                            });
                        }
                    }
                }
            }
        },

        //分隔触发目标
        //此方法应对数字字母混搭的复杂名称的触发目标存在欠缺，在“结构认知”进行了完善判断，可借鉴
        //时间不够，未在此进行修改测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        splitTriggerObject(obj) {
            var pos1 = obj.indexOf('+');
            var pos2 = obj.indexOf('|');
            if (pos1 == -1 && pos2 == -1) {
                return '1&' + obj;
            } else if (pos1 != -1) {
                var andArr = obj.split('+');
                var len = andArr.length;
                var numStart = parseInt(andArr[0].replace(/[^0-9]/ig, ''));
                var numEnd = parseInt(andArr[len - 1].replace(/[^0-9]/ig, ''));
                if ((numEnd - numStart + 1) != len) {
                    return '2&1&' + andArr.toString();
                } else {
                    return '2&2&' + andArr.toString();
                }
            } else {
                var orArr = obj.split('|');
                var len = orArr.length;
                var numStart = parseInt(orArr[0].replace(/[^0-9]/ig, ''));
                var numEnd = parseInt(orArr[len - 1].replace(/[^0-9]/ig, ''));
                if ((numEnd - numStart + 1) != len) {
                    return '3&1&' + orArr.toString();
                } else {
                    return '3&2&' + orArr.toString();
                }
            }
        },


        //刷新页面
        onNewBuild() {
            location.reload();
            impFileName = '';source
        },
    }
}
