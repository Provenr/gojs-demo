Vue.component('process-info', {
    // 在 JavaScript 中是 camelCase 的
    props: {
        info: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    computed: {
        innerInfo() {
            return this.info
        }
    },
    methods: {
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
                currClass = this.AnimationEvent.OptionItems.filter(function (p) {
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
                    currMethod = this.AnimationEvent.NewMethodName.filter(function (p) {
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
        cellClick(row, column) {
            row.seen = true;
        },
    },

    template: `
        <div>
            <div class="events" v-if="innerInfo.hasEvents">
                <el-table border @cell-click="cellClick">
                    <el-table-column label="序号">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Target }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="事件描述">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.StartValue" v-if="scope.row.seen"
                                @blur="loseFcous(scope.$index, scope.row)"> </el-input>
                            <span v-else>{{ scope.row.StartValue }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用时">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.EndValue" v-if="scope.row.seen"
                                @blur="loseFcous(scope.$index, scope.row)"> </el-input>
                            <span v-else>{{ scope.row.EndValue }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-form class="process">
                <div class="step-item">
                    <div class="name"><span>类型</span></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="innerInfo.ClassName" placeholder="请选择"
                                @change="selectChange" style="width: 100%;">
                                <el-option v-for="item in innerInfo.OptionItems" :key="item.code"
                                    :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name"><span>方法</span></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="innerInfo.MethodName" placeholder="请选择"
                                @change="methodSelectChange" style="width: 100%;">
                                <el-option v-for="item in innerInfo.NewMethodName" :key="item.code"
                                    :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name target-name"><span>目标</span></div>
                    <div class="input target">
                        <div class="target-item">
                            <el-radio :label="1">单</el-radio>
                            <el-input class="input-md"></el-input>
                        </div>
                        <div class="target-item">
                            <el-radio :label="1">与</el-radio>
                            <div>
                                <div class="target-sub-item">
                                    <el-radio :label="1">无序</el-radio>
                                    <el-input class="input-md"></el-input>
                                </div>
                                <div class="target-sub-item">
                                    <el-radio :label="1">有序</el-radio>
                                    <el-input class="input-md"></el-input>
                                    <span>至</span>
                                    <el-input class="input-md"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="target-item">
                            <el-radio :label="1">或</el-radio>
                            <div>
                                <div class="target-sub-item">
                                    <el-radio :label="1">无序</el-radio>
                                    <el-input class="input-md"></el-input>
                                </div>
                                <div class="target-sub-item">
                                    <el-radio :label="1">有序</el-radio>
                                    <el-input class="input-md"></el-input>
                                    <span>至</span>
                                    <el-input class="input-md"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name"><span>参数</span></div>
                    <div class="input">
                        <el-table border @cell-click="cellClick">
                            <el-table-column label="目标">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.Target }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="起始值">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.StartValue" v-if="scope.row.seen"
                                        @blur="loseFcous(scope.$index, scope.row)"> </el-input>
                                    <span v-else>{{ scope.row.StartValue }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="结束值">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.EndValue" v-if="scope.row.seen"
                                        @blur="loseFcous(scope.$index, scope.row)"> </el-input>
                                    <span v-else>{{ scope.row.EndValue }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name"><span>时间</span></div>
                    <div class="input time">
                        <el-input class="input-sm"></el-input><span>分</span>
                        <el-input class="input-sm"></el-input><span>秒</span>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name"><span>缓动</span></div>
                    <div class="input">
                        <el-form-item>
                            <el-input v-model="innerInfo.PlayType" @change="ctrlEventChange(1)"
                                ></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name"><span>循环</span></div>
                    <div class="input">
                        <el-form-item>
                            <el-select v-model="innerInfo.LoopType" placeholder="请选择"
                                @change="ctrlEventChange(1)"
                                style="width:100%;">
<!--                                <el-option v-for="item in loopTypeOptions" :key="item.code"-->
<!--                                    :label="item.text" :value="item.code">-->
<!--                                </el-option>-->
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div class="step-item">
                    <div class="name"><span>次数</span></div>
                    <div class="input time">
                        <el-input class="input-sm"></el-input><span>次</span>
                    </div>
                </div>
            </el-form>
        </div>
    `
})
