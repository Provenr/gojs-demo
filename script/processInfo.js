let id = 1; //初始id，用于部分需要id自增的场合
let nodeid; //当前node的id
let currNode = ''; //当前选中的事件
let currPNode = ''; //当前的父节点，主要用于事件的父节点——帧
let currClass = ''; //事件当前选中的类对象
let clsText = ''; //当前类的中文注释名
let mtdText = ''; //当前方法的中文注释名
let animationInit = ''; //配置文件中的底部<AnimationInit>中的大段数据
let xmlns = ''; //xml文件头部xmlns的信息


let template = `
        <!-- 开始、辅助进行、结束组件 -->
        <div v-if="type=='common'">
            <div class="events">
                <el-table
                    ref="eventTable"
                    :data="eventList"
                    border
                    highlight-current-row
                    @row-click="eventClick"
                    max-height="200"
                    :summary-method="getSummaries"
                    show-summary>
                    <el-table-column label="序号" width="50" aligin="center">
                        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column label="事件描述">
                        <template slot-scope="scope">
                            {{scope.row.text}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用时" width="60" aligin="center">
                        <template slot-scope="scope">
                            {{scope.row.time ? scope.row.time + 's' : ''}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-form class="process">
                <!-- 类型 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>类型</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="AnimationEvent.ClassName" placeholder="请选择"
                                @change="selectChange" :disabled="eventCtrlDisable.selectCtrl">
                                <el-option v-for="item in classList" :key="item.code"
                                    :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 方法 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>方法</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="AnimationEvent.MethodName" placeholder="请选择"
                                @change="methodSelectChange" :disabled="eventCtrlDisable.selectCtrl">
                                <el-option v-for="item in NewMethodName" :key="item.code"
                                    :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 目标 -->
                <div class="step-item">
                    <div class="name target-name"><div class="icon"><span>目标</span></div></div>
                    <div class="input target">
                        <!-- 单 -->
                        <div class="target-item">
                            <el-radio
                                v-model="AnimationEvent.TargetObject.TypeRadio"
                                :label="1"
                                :disabled="eventCtrlDisable.radioMain">单</el-radio>
                            <el-input
                                v-model="AnimationEvent.TargetObject.SingleObject"
                                @focus="focusMainRadio(1,1)"
                                @change="updateParam('1')"
                                :disabled="eventCtrlDisable.singleObj"
                                placeholder="仅输入一个目标"></el-input>
                        </div>
                        <!-- 与 -->
                        <div class="target-item">
                            <el-radio
                                v-model="AnimationEvent.TargetObject.TypeRadio"
                                :label="2"
                                :disabled="eventCtrlDisable.radioMain">与</el-radio>
                            <div>
                                <div class="target-sub-item">
                                    <el-radio
                                        v-model="AnimationEvent.TargetObject.AndObjects.AndRadio"
                                        :label="1"
                                        :disabled="eventCtrlDisable.nonSingleObj">无序</el-radio>
                                    <el-input
                                        v-model="AnimationEvent.TargetObject.AndObjects.NoSqcObjects"
                                        @focus="focusMainRadio(1,2);focusSubRadio(1,1)"
                                        @change="updateParam('21')"
                                        :disabled="eventCtrlDisable.nonSingleObj"
                                        placeholder="多个目标逗号（英文）分隔"></el-input>
                                </div>
                                <div class="target-sub-item">
                                    <el-radio
                                        v-model="AnimationEvent.TargetObject.AndObjects.AndRadio"
                                        :label="2"
                                        :disabled="eventCtrlDisable.nonSingleObj">有序</el-radio>
                                    <div class="range">
                                        <el-input
                                            v-model="AnimationEvent.TargetObject.AndObjects.SqcObject1"
                                            @focus="focusMainRadio(1,2);focusSubRadio(1,2)"
                                            @change="orderChange('2')"
                                            :disabled="eventCtrlDisable.nonSingleObj"
                                            placeholder="开始"></el-input>
                                        <span>至</span>
                                        <el-input
                                            v-model="AnimationEvent.TargetObject.AndObjects.SqcObject2"
                                            @focus="focusMainRadio(1,2);focusSubRadio(1,2)"
                                            @change="orderChange('2')"
                                            :disabled="eventCtrlDisable.nonSingleObj"
                                            placeholder="结束"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 或 -->
                        <div class="target-item">
                            <el-radio
                                v-model="AnimationEvent.TargetObject.TypeRadio"
                                :label="3"
                                :disabled="eventCtrlDisable.radioMain">或</el-radio>
                            <div>
                                <div class="target-sub-item">
                                    <el-radio
                                        v-model="AnimationEvent.TargetObject.OrObjects.OrRadio"
                                        :label="1"
                                        :disabled="eventCtrlDisable.nonSingleObj">无序</el-radio>
                                    <el-input
                                        v-model="AnimationEvent.TargetObject.OrObjects.NoSqcObjects"
                                         @focus="focusMainRadio(1,3);focusSubRadio(1,1)"
                                        @change="updateParam('31')"
                                        :disabled="eventCtrlDisable.nonSingleObj"
                                        placeholder="多个目标逗号（英文）分隔"></el-input>
                                </div>
                                <div class="target-sub-item">
                                    <el-radio
                                        v-model="AnimationEvent.TargetObject.OrObjects.OrRadio"
                                        :label="2"
                                        :disabled="eventCtrlDisable.nonSingleObj">有序</el-radio>
                                    <div class="range">
                                        <el-input
                                            v-model="AnimationEvent.TargetObject.OrObjects.SqcObject1"
                                            @focus="focusMainRadio(1,3);focusSubRadio(1,2)"
                                            @change="orderChange('3')"
                                            :disabled="eventCtrlDisable.nonSingleObj"
                                            placeholder="开始"></el-input>
                                        <span>至</span>
                                        <el-input
                                            v-model="AnimationEvent.TargetObject.OrObjects.SqcObject2"
                                            @focus="focusMainRadio(1,3);focusSubRadio(1,2)"
                                            @change="orderChange('3')"
                                            :disabled="eventCtrlDisable.nonSingleObj"
                                            placeholder="结束"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 参数 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>参数</span></div></div>
                    <div class="input">
                        <el-table :data="targetData" border max-height="200" @cell-click="cellClick">
                            <el-table-column label="目标">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.Target }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="起始值">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.StartValue" v-if="scope.row.seen"
                                        @blur="loseFcous(scope.$index, scope.row)" :disabled="eventCtrlDisable.par"></el-input>
                                    <span v-else>{{ scope.row.StartValue }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="结束值">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.EndValue" v-if="scope.row.seen"
                                        @blur="loseFcous(scope.$index, scope.row)" :disabled="eventCtrlDisable.par"></el-input>
                                    <span v-else>{{ scope.row.EndValue }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 时间 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>时间</span></div></div>
                    <div class="input time">
                        <el-input class="input-sm"
                            v-model="AnimationEvent.DurationMinute"
                            :disabled="eventCtrlDisable.dotw"></el-input><span>分</span>
                        <el-input class="input-sm"
                            v-model="AnimationEvent.DurationSecond"
                            :disabled="eventCtrlDisable.dotw"></el-input><span>秒</span>
                    </div>
                </div>
                <!-- 缓动 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>缓动</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select
                                v-model="AnimationEvent.PlayType"
                                placeholder="请选择"
                                :disabled="eventCtrlDisable.dotw">
                                <el-option label="无" value="0"></el-option>
                                <el-option label="直线" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 循环 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>循环</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select
                                v-model="AnimationEvent.LoopType"
                                placeholder="请选择"
                                :disabled="eventCtrlDisable.dotw">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 次数 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>次数</span></div></div>
                    <div class="input time">
                        <el-input class="input-sm"
                            v-model="AnimationEvent.LoopTimes"
                            :disabled="eventCtrlDisable.dotw"></el-input><span>次</span>
                    </div>
                </div>
            </el-form>
            <div class="process-btns">
                <el-button class="small-button" type="primary" plain @click="submit" :disabled="!eventCtrlDisable.selectCtrl">保存</el-button>
                <el-button class="small-button" type="warning" plain @click="add"
                :disabled="!AnimationEvent.MethodName">新建</el-button>
            </div>
        </div>

        <!-- 进行 -->
        <div v-else>
            <el-form class="process">
                <!-- 工具 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>工具</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="StepEvent.ToolType" placeholder="请选择">
                                <el-option v-for="item in ToolListOptions" :label="item.name" :value="item.id" :key="id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 目标 -->
                <div class="step-item">
                    <div class="name target-name1"><div class="icon"><span>目标</span></div></div>
                    <div class="input target">
                        <div class="target-item">
                            <el-radio v-model="StepEvent.TargetObject.TypeRadio" :label="1">单</el-radio>
                            <el-input v-model="StepEvent.TargetObject.SingleObject" placeholder="仅输入一个目标"></el-input>
                        </div>
                        <div class="target-item">
                            <el-radio v-model="StepEvent.TargetObject.TypeRadio" :label="2">或</el-radio>
                            <div>
                                <div class="target-sub-item">
                                    <el-radio v-model="StepEvent.TargetObject.OrObjects.OrRadio" :label="1">无序</el-radio>
                                    <el-input v-model="StepEvent.TargetObject.OrObjects.NoSqcObjects" placeholder="多个目标逗号（英文）分隔"></el-input>
                                </div>
                                <div class="target-sub-item">
                                    <el-radio v-model="StepEvent.TargetObject.OrObjects.OrRadio" :label="2">有序</el-radio>
                                    <div class="range">
                                        <el-input v-model="StepEvent.TargetObject.OrObjects.SqcObject1" placeholder="开始"></el-input>
                                        <span>至</span>
                                        <el-input v-model="StepEvent.TargetObject.OrObjects.SqcObject2" placeholder="结束"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 排除 -->
                <div class="step-item">
                    <div class="name target-name1"><div class="icon"><span>排除</span></div></div>
                    <div class="input target">
                        <div class="target-item">
                            <el-radio v-model="StepEvent.MaskObject.TypeRadio" :label="1">单</el-radio>
                            <el-input v-model="StepEvent.MaskObject.SingleObject" placeholder="仅输入一个目标"></el-input>
                        </div>
                        <div class="target-item">
                            <el-radio v-model="StepEvent.MaskObject.TypeRadio" :label="2">或</el-radio>
                            <div>
                                <div class="target-sub-item">
                                    <el-radio v-model="StepEvent.MaskObject.OrObjects.OrRadio" :label="1">无序</el-radio>
                                    <el-input v-model="StepEvent.MaskObject.OrObjects.NoSqcObjects" placeholder="多个目标逗号（英文）分隔"></el-input>
                                </div>
                                <div class="target-sub-item">
                                    <el-radio v-model="StepEvent.MaskObject.OrObjects.OrRadio" :label="2">有序</el-radio>
                                    <div class="range">
                                        <el-input v-model="StepEvent.MaskObject.OrObjects.SqcObject1" placeholder="开始"></el-input>
                                        <span>至</span>
                                        <el-input v-model="StepEvent.MaskObject.OrObjects.SqcObject2" placeholder="结束"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 展示模式 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span class="sm">展示模式</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="StepEvent.ShowMode" placeholder="请选择">
                                <el-option label="animation" value="animation"></el-option>
                                <el-option label="dotween" value="dotween"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 参数 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span>参数</span></div></div>
                    <div class="input">
                        <el-table :data="StepEvent.StepParam" border max-height="200" @cell-click="cellClick">
                            <el-table-column label="序号" width="50">
                                <template slot-scope="scope">
                                    <span>{{ scope.$index + 1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="目标" width="60">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.ObjectName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="磁盘类型">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.ColliderMode" placeholder="请选择">
                                        <el-option label="mesh" value="mesh"></el-option>
                                        <el-option label="box" value="box"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="磁盘大小">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.ColliderScale"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 触发类型 -->
                <div class="step-item">
                    <div class="name"><div class="icon"><span class="sm">触发类型</span></div></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="StepEvent.TriggerMode" placeholder="请选择">
                                <el-option label="PC" value="0"></el-option>
                                <el-option label="VR" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    `

Vue.component('process-info', {
    // 在 JavaScript 中是 camelCase 的
    props: {
        info: {
            type: Object,
            required: true,
            default: () => {}
        },
        type: {
            type: String,
            default: 'common'
        }
    },
    data() {
        return {
            classList: JSON.parse(JSON.stringify(classmethod)), // 类型选项，从classmethod.js里获取
            eventList: [], // 事件列表
            eventItemIndex: -1, // 当前事件列表选中的索引
            NewMethodName: [], // 方法
            //控件禁用状态：初始只有类型和方法均不可用
            eventCtrlDisable: {
                selectCtrl: false, //类、方法下拉框
                radioMain: true, //主单选按钮
                singleObj: true, //单选物体
                nonSingleObj: true, //非单选物体
                par: true, //参数表
                dotw: true, //dotw
            },
            AnimationEvent: { // 信息
                ClassName: '', //类名
                MethodName: '', //方法名
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
                PlayType: '0', // 缓动，播放类型
                LoopType: '0', //循环类型
                LoopTimes: '0', //循环次数
            },
            StepEvent: { // 进行信息
                ToolType: '', //工具名
                TargetObject: { //目标物体
                    TypeRadio: '', //主单选按钮
                    SingleObject: '', //单物体
                    OrObjects: {
                        OrRadio: '', //或单选按钮
                        NoSqcObjects: '', //无序
                        SqcObject1: '', //有序1
                        SqcObject2: '' //有序2
                    }
                },
                MaskObject: { //排除物体
                    TypeRadio: '', //主单选按钮
                    SingleObject: '', //单物体
                    OrObjects: {
                        OrRadio: '', //或单选按钮
                        NoSqcObjects: '', //无序
                        SqcObject1: '', //有序1
                        SqcObject2: '' //有序2
                    }
                },
                StepParam: [], // 参数
                ShowMode: '', // 展示模式
                TriggerMode: '', // 触发模型
            },
            // 事件对象信息表数据
            targetData: [],
            hasObj: false, // 是否含有目标
            hasPar: false, // 是否含有参数
            hasDotW: false, // 是否含有下边那4项
            delayInputShow: false, // 总用时是否显示输入框
        }
    },
    created() {
        // 进行步骤
        if (this.type === 'step') {
            this.formateStepEvent()
        } else {
            this.formateEventList()
        }
    },
    watch: {
        info() {
            // 进行步骤
            if (this.type === 'step') {
                this.formateStepEvent()
            } else {
                this.formateEventList()
                this.resetEventData()
            }
        },
        'AnimationEvent.TargetObject.TypeRadio'(newV) { // 主单选
            // console.log('主', newV)
            let AndRadio = this.AnimationEvent.TargetObject.AndObjects.AndRadio,
                OrRadio = this.AnimationEvent.TargetObject.OrObjects.OrRadio
            if (newV == '1') { // 选择单
                this.updateParam('1')
            } else {
                if (newV == '2' && AndRadio) { // 选择与
                    this.updateParam('2' + AndRadio)
                }
                if (newV == '3' && OrRadio) { // 选择或
                    this.updateParam('3' + OrRadio)
                }
            }
        },
        'AnimationEvent.TargetObject.AndObjects.AndRadio'(newV) { // 与单选
            // console.log('与', newV)
            if (this.AnimationEvent.TargetObject.TypeRadio == 2 && newV != 0) {
                this.updateParam('2' + newV)
            }
        },
        'AnimationEvent.TargetObject.OrObjects.OrRadio'(newV) { // 或单选
            // console.log('或', newV)
            if (this.AnimationEvent.TargetObject.TypeRadio == 3 && newV != 0) {
                this.updateParam('3' + newV)
            }
        }
     },
    methods: {
        // 根据目标更新参数
        updateParam(type) { // 1：单选，21：与无序，22：与有序，31：或无序，32：或有序
            // console.log(type)
            switch (type) {
                case '1':
                    // 没有值参数设置为[]
                    this.targetData = this.AnimationEvent.TargetObject.SingleObject ? [{
                        'seen': false, //可见性
                        'Target': this.AnimationEvent.TargetObject.SingleObject, //目标
                        "StartValue": '', //起始值
                        'EndValue': '' //结束值
                    }] : []
                    break
                case '21':
                    // 无序只传一个值
                    this.targetData = this.obj2par(this.AnimationEvent.TargetObject.AndObjects.NoSqcObjects)
                    break
                case '22':
                    // 有序传开始和结束
                    this.targetData = this.obj2par(this.AnimationEvent.TargetObject.AndObjects.SqcObject1, this.AnimationEvent.TargetObject.AndObjects.SqcObject2)
                    break
                case '31':
                    this.targetData = this.obj2par(this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects)
                    break
                case '32':
                    this.targetData = this.obj2par(this.AnimationEvent.TargetObject.OrObjects.SqcObject1, this.AnimationEvent.TargetObject.OrObjects.SqcObject2)
                    break
            }
        },
        // 根据目标设置参数
        obj2par(str1, str2) {
            if (!!str2) {
                if (!!str1) {
                    let start = +(str1.substr(str1.lastIndexOf('_') + 1)),
                        end = +(str2.substr(str2.lastIndexOf('_') + 1)),
                        str = str1.substring(0, str1.lastIndexOf('_') + 1)
                    par = []
                    for (let i = start; i <= end; i++) {
                        par.push({
                            'seen': false, //可见性
                            'Target': str + i, //目标
                            "StartValue": '', //起始值
                            'EndValue': '' //结束值
                        })
                    }
                    return par
                } else {
                    return []
                }
            } else {
                return str1 ? str1.split(',').map(item => ({
                    'seen': false, //可见性
                    'Target': item, //目标
                    "StartValue": '', //起始值
                    'EndValue': '' //结束值
                })) : []
            }
        },
        // 有序blur
        orderChange(radio) {
            let radioMap = {
                '2': 'AndObjects',
                '3': 'OrObjects'
            }
            let start = this.AnimationEvent.TargetObject[radioMap[radio]].SqcObject1,
                end = this.AnimationEvent.TargetObject[radioMap[radio]].SqcObject2
            if (!!start && !!end) { // 只有开始和结束都有才执行
                if (start.substring(0, start.lastIndexOf('_') + 1) != end.substring(0, end.lastIndexOf('_') + 1)) {
                    this.$alert('有序对象1和对象2的名称前缀不一致，请检查', '提示', { type: 'warning' });
                } else {
                    this.updateParam(radio + '2')
                }
            } else {
                this.targetData = []
            }
        },
        // 重置绑定信息
        resetEventData() {
            this.eventList =  [] // 事件列表
            this.eventItemIndex = -1 // 当前事件列表选中的索引
            this.NewMethodName = [] // 方法
            //控件禁用状态：初始只有类型和方法均不可用
            this.eventCtrlDisable = {
                selectCtrl: false, //类、方法下拉框
                radioMain: true, //主单选按钮
                singleObj: true, //单选物体
                nonSingleObj: true, //非单选物体
                par: true, //参数表
                dotw: true, //dotw
            }
            this.AnimationEvent = { // 信息
                ClassName: '', //类名
                MethodName: '', //方法名
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
                PlayType: '0', // 缓动，播放类型
                LoopType: '0', //循环类型
                LoopTimes: '0', //循环次数
            }
            this.targetData = []
            this.hasObj = false // 是否含有目标
            this.hasPar = false // 是否含有参数
            this.hasDotW = false // 是否含有下边那4项
        },
        // 解析通用事件列表
        formateEventList() {
            if (this.info.EventList.Event instanceof Array) {
                this.eventList = this.info.EventList.Event.map(item => {
                    return this.code2text(item._Content)
                })
            }
        },
        // 根据code获取text，格式化事件列表数据
        code2text(code) {
            let [classCode, methodCode] = code.split('#')[0].slice(0, -1).split('_')
            let className = '', methodName = '', time = '', classList = this.classList
            for (let i = 0, length = classList.length; i < length; i++) {
                if (classCode == classList[i].code) {
                    className = classList[i].text
                    let methodList = classList[i].children, len = methodList.length
                    for (let j = 0; j < len; j++) {
                        if (methodCode == methodList[j].code) {
                            methodName = methodList[j].text
                            break
                        }
                    }
                    break
                }
            }
            if (code.includes('#dotw')) {
                time = code.substring(code.indexOf('#dotw') + 5, code.lastIndexOf('#dotw')).split('#')[0]
            }
            return {
                text: (className || classCode) + '_' + (methodName || methodCode),
                code: code,
                time: time
            }
        },
        // 组装格式化进行步骤数据
        formateStepEvent() {
            let stepInfo = this.info
            // 工具
            let [ToolType] = stepInfo._TriggerObject.split('|')
            // 目标
            let TargetObject = stepInfo._TriggerObject.substr(stepInfo._TriggerObject.indexOf('|') + 1)
            // 排除
            let MaskObject = stepInfo.MaskColliderObject
            // 目标名称
            let ObjectName = stepInfo._ObjectName.split('|')
            // 磁盘类型
            let ColliderMode = stepInfo._ColliderMode.split('|')
            // 磁盘大小
            let ColliderScale = stepInfo._ColliderScale.split('|')
            // 触发类型
            let TriggerMode = stepInfo._TriggerMode
            // 展示模式
            let ShowMode = stepInfo._ShowMode
            // 参数组合
            let StepParam = ObjectName.map((item, index) => {
                return {
                    ObjectName: item,
                    ColliderMode: ColliderMode[index],
                    ColliderScale: ColliderScale[index]
                }
            })
            // 目标
            if (TargetObject) {
                if (TargetObject.includes('|')) { // 或，默认为无序
                    this.StepEvent.TargetObject.TypeRadio = 2
                    this.StepEvent.TargetObject.OrObjects.OrRadio = 1
                    this.StepEvent.TargetObject.OrObjects.NoSqcObjects = TargetObject.replace(/\|/g, ',')
                    // 单置空
                    this.StepEvent.TargetObject.SingleObject = ''
                } else { // 单
                    this.StepEvent.TargetObject.TypeRadio = 1
                    this.StepEvent.TargetObject.SingleObject = TargetObject
                    // 或置空
                    this.StepEvent.TargetObject.OrObjects.OrRadio = ''
                    this.StepEvent.TargetObject.OrObjects.NoSqcObjects = ''
                }
            }
            // 排除
            if (MaskObject && MaskObject != 'null') {
                if (MaskObject.includes('|')) { // 或，默认为无序
                    this.StepEvent.MaskObject.TypeRadio = 2
                    this.StepEvent.MaskObject.OrObjects.OrRadio = 1
                    this.StepEvent.MaskObject.OrObjects.NoSqcObjects = MaskObject.replace(/\|/g, ',')
                    // 单置空
                    this.StepEvent.MaskObject.SingleObject = ''
                } else { // 单
                    this.StepEvent.MaskObject.TypeRadio = 1
                    this.StepEvent.MaskObject.SingleObject = MaskObject
                    // 或置空
                    this.StepEvent.MaskObject.OrObjects.OrRadio = ''
                    this.StepEvent.MaskObject.OrObjects.NoSqcObjects = ''
                }
            }
            this.StepEvent.ToolType = ToolType
            this.StepEvent.StepParam = StepParam
            this.StepEvent.TriggerMode = TriggerMode
            this.StepEvent.ShowMode = ShowMode
        },
        // 事件列表最后一行合并
        getSummaries(param) {
            const h = this.$createElement;
            const { columns } = param;
            const sums = [];
            columns.forEach((_, index) => {
                if (index === 0) {
                    sums[index] = '';
                    return;
                }
                if (index === 1) {
                    sums[index] = '总用时';
                    return;
                }
                if (index === 2) {
                    sums[index] = h('div', {
                        attrs: {
                            class: 'delay'
                        },
                        on: {
                            click: () => this.delayInputShow = true
                        }
                    }, [this.delayInputShow ? h('el-input', {
                        attrs: {
                            'value': this.info._NextDelay,
                        },
                        on: {
                            blur: () => this.delayInputShow = false,
                            input: e => this.info._NextDelay = e
                        }
                    }, 'click') : (this.info._NextDelay ? this.info._NextDelay + 's' : ' ')])
                    return;
                }
            });

            return sums;
        },
        // 点击事件列表某一行
        eventClick(row) {
            console.log(row)
            this.eventItemIndex = this.eventList.indexOf(row)
            this.$refs.eventTable.setCurrentRow(row)
            this.parseEventData(row.code)
            this.eventCtrlDisable.selectCtrl = true
        },
        // 解析事件数据
        parseEventData(str) {
            this.targetData = []
            // 获取类型和方法
            let classAndMethod = str.split('#')[0].slice(0, -1).split('_')
            // 类型、方法处理
            this.AnimationEvent.ClassName = classAndMethod[0]
            this.AnimationEvent.MethodName = classAndMethod[1]
            // 参数处理
            let param = str.substr(str.indexOf('#'))
            let obj = '', par = '', dotw = ''
            if (param.includes('#obj')) {
                this.hasObj = true
                obj = param.slice(param.indexOf('#obj') + 4, param.lastIndexOf('#obj'))
            }
            if (param.includes('#par')) {
                this.hasPar = true
                par = param.slice(param.indexOf('#par') + 4, param.lastIndexOf('#par'))
            }
            if (param.includes('#dotw')) {
                this.hasDotW = true
                dotw = param.slice(param.indexOf('#dotw') + 5, param.lastIndexOf('#dotw'))
            }
            // 含有#obj
            if (obj) {
                if (/[\|\+]/.test(obj)) { // 说明是有多个对象
                    if (/\|/.test(obj)) { // 或
                        this.AnimationEvent.TargetObject.TypeRadio = 3
                        this.AnimationEvent.TargetObject.OrObjects.OrRadio = 1 // 或中无序
                        this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = obj.repeat(/\|/g, ',')
                    } else { // 与
                        this.AnimationEvent.TargetObject.TypeRadio = 2
                        this.AnimationEvent.TargetObject.OrObjects.OrRadio = 1 // 与中无序
                        this.AnimationEvent.TargetObject.OrObjects.NoSqcObjects = obj.repeat(/\+/g, ',')
                    }
                } else {
                    this.AnimationEvent.TargetObject.TypeRadio = 1
                    this.AnimationEvent.TargetObject.SingleObject = obj
                }
            }
            // 不含有#obj
            if (!obj) {
                this.AnimationEvent.TargetObject = { //目标物体
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
                }
            }
            // 含有#par
            if (par) {
                let pars = par.split('|')
                let objs = obj.split('|')
                pars.forEach((item, index) => {
                    this.targetData.push({
                        'seen': false, //可见性
                        'Target': objs[index], //目标
                        "StartValue": item.includes('+') ? item.split('+')[0] : '', //起始值
                        'EndValue': item.includes('+') ? item.split('+')[1] : item //结束值
                    })
                })
            }
            console.log(this.targetData)
            // 含有#dotw
            if (dotw) {
                let [duration, PlayType, LoopType, LoopTimes ] = dotw.split('#')
                this.AnimationEvent.DurationMinute = parseInt(duration / 60)
                this.AnimationEvent.DurationSecond = duration % 60
                this.AnimationEvent.PlayType = PlayType
                this.AnimationEvent.LoopType = LoopType
                this.AnimationEvent.LoopTimes = LoopTimes
            }
            // 不含有#dotw
            if (!dotw) {
                this.AnimationEvent.DurationMinute = 0
                this.AnimationEvent.DurationSecond = 0
                this.AnimationEvent.PlayType = '0'
                this.AnimationEvent.LoopType = '0'
                this.AnimationEvent.LoopTimes = '0'
            }
            // 是否可操作
            this.eventCtrlDisable.radioMain = !obj
            this.eventCtrlDisable.singleObj = !obj
            this.eventCtrlDisable.nonSingleObj = !obj
            this.eventCtrlDisable.par = !par
            this.eventCtrlDisable.dotw = !dotw
            console.log(this.eventCtrlDisable)
        },
        // AnimationEvent json格式的转换成字符串形式的，EventList里Event格式
        json2str(type) { // type操作类型，save保存，add新建
            let eventItem = '' // 事件项
            let AnimationEvent = this.AnimationEvent
            let { ClassName, MethodName, DurationMinute, DurationSecond, PlayType, LoopType, LoopTimes } = AnimationEvent
            //  目标obj
            let obj = ''
            if (this.hasObj) {
                let TargetObject = AnimationEvent.TargetObject
                let TypeRadio = TargetObject.TypeRadio
                let AndObjects = TargetObject.AndObjects
                if (TypeRadio == 1) {
                    obj = `#obj${TargetObject.SingleObject}#obj`
                } else if (TypeRadio == 2) {
                    if (AndObjects.AndRadio == 1) {
                        obj = `#obj${AndObjects.NoSqcObjects.replace(/\,/g, '|')}#obj`
                    } else {
                        obj = `#obj${AndObjects.SqcObject1}+${AndObjects.SqcObject2}#obj`
                    }
                } else if (TypeRadio == 3) {
                    if (OrObjects.AndRadio == 1) {
                        obj = `#obj${OrObjects.NoSqcObjects.replace(/\,/g, '|')}#obj`
                    } else {
                        obj = `#obj${OrObjects.SqcObject1}+${OrObjects.SqcObject2}#obj`
                    }
                }
            }
            
            // 参数par
            let par = '', temp = []
            if (this.hasPar) {
                this.targetData.forEach(item => {
                    if (item.StartValue && item.EndValue) {
                        temp.push(`${item.StartValue}+${item.EndValue}`)
                    } else if (item.StartValue) {
                        temp.push(`${item.StartValue}`)
                    } else if (item.EndValue) {
                        temp.push(`${item.EndValue}`)
                    }
                })
                par = `#par${temp.join('|')}#par`
            }
            
            // dotw
            let dotw = this.hasDotW ? `#dotw${DurationMinute * 60 + DurationSecond * 1}#${PlayType}#${LoopType}#${LoopTimes}#dotw` : ''
            eventItem = [ClassName, MethodName, obj, par, dotw].filter(item => item != '').join('_')
            console.log(eventItem)
            if (type == 'save') {
                this.$set(this.eventList, this.eventItemIndex, this.code2text(eventItem))
                this.info.EventList.Event[this.eventItemIndex]._Content = eventItem
            } else {
                this.eventList.push(this.code2text(eventItem))
                this.info.EventList.Event.push({ _Content: eventItem })
            }

            this.$message({
                message: type == 'save' ? '保存成功' : '新建成功',
                type: 'success'
            });
            this.$emit('update', this.info)
        },
        // 保存
        submit() {
            this.json2str('save')
        },
        // 新建
        add() {
            this.json2str('add')
        },
        //保存提交按钮
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
                                    '" TriggerObject="' + this.getObjectData(node.TriggerObject, 1 ) +
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
        /**
         * 事件类名、方法名二级联动
         * 两种情况：新建事件时，选择class后，默认取第一个method
         *          从事件列表点击事件时，class直接被更新，再根据class值，查询其children
         *          即方法集合，再从方法集合中查method传递过来的值
         * 方法的更新还需要将对应的模块权限也刷新
         * @param {*} value class名
         * @param {*} methodCode 方法名
         */
        selectChange(value, methodCode) {
            //根据传递进来的value查找类名对象，应当唯一
            currClass = this.classList.filter(function (p) {
                return p.code === value;
            });
            //clsText用于树节点事件label中的class
            clsText = currClass[0].text;
            currNode.ClassName = value;
            //NewMethodName数组为class下所有的方法
            this.NewMethodName = currClass[0].children;

            if (methodCode == '' || methodCode == undefined) {
                //数据模型的MethodName取code
                this.MethodName = this.NewMethodName[0].code;
                //配置三块功能区权限
                var obj = this.NewMethodName[0].obj;
                var par = this.NewMethodName[0].par;
                var dotw = this.NewMethodName[0].dotw;
                //树节点上label中方法名称，以及
                mtdText = this.NewMethodName[0].text;
                currNode.MethodName = this.NewMethodName[0].code;
            } else {
                currMethod = this.NewMethodName.filter(function (p) {
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
            // //根据类的text和方法的text更新树节点中的label
            // this.updateTreeEventNode(clsText, mtdText);
            // this.$refs.vuetree.setCurrentNode(currNode);
            //结尾将方法的code置为null，以免传递给后面的操作
            methodCode = undefined;
        },
        //方法名改变事件
        methodSelectChange(code) {
            currNode.MethodName = code;
            // this.$refs.vuetree.setCurrentNode(currNode);
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
            // //根据类的text和方法的text更新树节点中的label
            // this.updateTreeEventNode(clsText, mtdText);
        },
        //根据方法参数中的配置，事件信息区域禁用部分控件
        setCtrlDisable(obj, par, dotw) {
            //禁用包括两部分，左侧的流程糖葫芦串和右边对应的控件
            //设置禁用和启用两种颜色，用于流程图
            // var disableColor = 'gray';
            // var enableColor = 'darkturquoise';
            this.hasObj = obj != 0
            this.hasPar = par != 0
            this.hasDotW = dotw != 0
            switch (obj) {
                //触发目标三个逻辑下的控件
                case 0:
                    // this.$refs.refEventTarget.style.background = disableColor;
                    this.eventCtrlDisable.radioMain = true;
                    this.eventCtrlDisable.singleObj = true;
                    this.eventCtrlDisable.nonSingleObj = true;
                    break;
                case 1:
                    // this.$refs.refEventTarget.style.background = enableColor;
                    this.eventCtrlDisable.radioMain = false;
                    this.eventCtrlDisable.singleObj = false;
                    this.eventCtrlDisable.nonSingleObj = true;
                    break;
                case 2:
                    // this.$refs.refEventTarget.style.background = enableColor;
                    this.eventCtrlDisable.radioMain = false;
                    this.eventCtrlDisable.singleObj = false;
                    this.eventCtrlDisable.nonSingleObj = false;
                    break;
            }
            switch (par) {
                // 参数表
                case 0:
                    // this.$refs.refEventValueArray.style.background = disableColor;
                    this.eventCtrlDisable.par = true;
                    break;
                case 1:
                    // this.$refs.refEventValueArray.style.background = enableColor;
                    this.eventCtrlDisable.par = false;
                    break;
                case 2:
                    // this.$refs.refEventValueArray.style.background = enableColor;
                    this.eventCtrlDisable.par = false;
                    break;
            }

            switch (dotw) {
                //事件区最底下四项
                case 0:
                    this.eventCtrlDisable.dotw = true;
                    break;
                case 1:
                    this.eventCtrlDisable.dotw = false;
                    break;
            }

        },
        //可编辑表格
        loseFcous(index, row) {
            row.seen = false;
            //数据在此更新到树中，不调用ctrlEventChange（调用传currNode过去无法接受修改值）
            currNode.TargetData = this.targetData;
        },
        cellClick(row, column) {
            row.seen = true;
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

        //事件信息区域的控件数值改变，实时对树节点进行修改
        //本方法的重难点在于事件触发物修改是，何种逻辑下，保留原来的部分数据进行修改，何种逻辑下清除原来的数据，重新写入
        //经过慎重考虑，“单”逻辑和“与”、“或”中的有序逻辑下，触发物体修改，需要部分修改参数表，其他情况则清空
        ctrlEventChange() {
            
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

        //根据方法参数中的配置，事件信息区域禁用部分控件
        setCtrlDisable(obj, par, dotw) {
            this.hasObj = obj != 0
            this.hasPar = par != 0
            this.hasDotW = dotw != 0
            switch (obj) {
                //触发目标三个逻辑下的控件
                case 0:
                    this.eventCtrlDisable.radioMain = true;
                    this.eventCtrlDisable.singleObj = true;
                    this.eventCtrlDisable.nonSingleObj = true;
                    break;
                case 1:
                    this.eventCtrlDisable.radioMain = false;
                    this.eventCtrlDisable.singleObj = false;
                    this.eventCtrlDisable.nonSingleObj = true;
                    break;
                case 2:
                    this.eventCtrlDisable.radioMain = false;
                    this.eventCtrlDisable.singleObj = false;
                    this.eventCtrlDisable.nonSingleObj = false;
                    break;
            }
            switch (par) {
                // 参数表
                case 0:
                    this.eventCtrlDisable.par = true;
                    break;
                case 1:
                    this.eventCtrlDisable.par = false;
                    break;
                case 2:
                    this.eventCtrlDisable.par = false;
                    break;
            }

            switch (dotw) {
                //事件区最底下四项
                case 0:
                    this.eventCtrlDisable.dotw = true;
                    break;
                case 1:
                    this.eventCtrlDisable.dotw = false;
                    break;
            }

        }
    },

    template: template
})
