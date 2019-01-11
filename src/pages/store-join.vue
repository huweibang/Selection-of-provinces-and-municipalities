<template>
    <div class="flexbox" :style="{height: defaultHeight + 'px'}">
        <div class="box flexbox flex">
            <div class="container flex">
                <div class="store-item between flexbox">
                    <h3>欢迎加入哇塔优选！</h3>
                    <img src="@/images/mendian.png" class="mendian">
                </div>
                <div class="store-item between flexbox">
                    <span>所在地区：</span>
                    <div class="choseRegion flexbox flex" @click="choseRegion">{{ssq}}</div>
                    <img src="@/images/more-hui.png" class="more">
                </div>
                <div class="store-item between flexbox">
                    <span>所在小区：</span>
                    <input type="text" class="inp flex" placeholder="您好！请输入小区名称">
                </div>
                <div class="store-item between flexbox">
                    <span>门店名称：</span>
                    <input type="text" class="inp flex">
                </div>
                <div class="store-item between flexbox">
                    <span>真实姓名：</span>
                    <input type="text" class="inp flex">
                </div>
                <div class="store-item between flexbox">
                    <span>联系电话：</span>
                    <input type="text" class="inp flex">
                </div>
                <div class="btn">提交申请，等待联系</div>
            </div>
        </div>
        <!-- 选择省市区 -->
        <transition name="fade">
            <div class="ssq-box" v-if="region">
                <div class="zhezhao" ref="zhezhao" @click="close"></div>
            </div>
        </transition>
        <transition name="slide">
            <div class="ssq-wrap flexbox" :style="{height: slideToggleHeight + 'px'}" v-if="slideToggle">
                <div class="ssq-wrap-top flexbox">
                    <span class="chose">请选择</span>
                    <img src="@/images/close.png" class="close-img" @click="close">
                </div>
                <div class="ssq-wrap-bottom flex">
                    <!-- 已选择的省市区 -->
                    <div class="step" v-if="ssqChose.length > 0">
                        <span class="step-title flexbox" v-if="ssqChose.length >= 1" @click="reSelection(0)">{{ssqChose[0]}}</span>
                        <span class="step-fu-title flexbox" v-if="ssqChose.length >= 2"></span>
                        <span class="step-title flexbox" v-if="ssqChose.length >= 2" @click="reSelection(1)">{{ssqChose[1]}}</span>
                        <span class="step-fu-title flexbox" v-if="ssqChose.length == 3"></span>
                        <span class="step-title flexbox" v-if="ssqChose.length == 3" @click="reSelection(2)">{{ssqChose[2]}}</span>
                    </div>
                    <!-- 已选择的省市区 -->
                    <div class="ssq-container flex">
                        <div style="border-top: 1px solid #DEDEDE;" v-if="hotCityFlag">
                            <h3 class="ssq-title1">热门城市</h3>
                            <ul class="hotCity-arr flexbox">
                                <li class="hotCity-item" v-for="(item, index) in hotCity" :key="index">
                                    <span @click="choseHotCity(item)">{{item}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- 省 -->
                        <div v-if="sheng">
                            <h3 class="ssq-title2">选择省份/地区</h3>
                            <div class="ssq-container-box">
                                <div class="ssq-container-box-item flexbox" v-for="(item, index) in provinceArr">
                                    <div class="ssq-item-letter">
                                        <span>{{item.letter}}</span>
                                    </div>
                                    <div class="flex">
                                        <div class="ssq-item flexbox" v-for="(list, index) in item.data" @click="choseProvince(list)">
                                            <span>{{list}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 省 -->
                        <!-- 市 -->
                        <div v-if="shi">
                            <h3 class="ssq-title2">选择城市</h3>
                            <div class="ssq-container-box">
                                <div class="ssq-container-box-item flexbox" v-for="(item, index) in cityArr">
                                    <div class="ssq-item-letter">
                                        <span>{{item.letter}}</span>
                                    </div>
                                    <div class="flex">
                                        <div class="ssq-item flexbox" v-for="(list, index) in item.data" @click="choseCity(list)">
                                            <span>{{list}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 市 -->
                        <!-- 区 -->
                        <div v-if="qu">
                            <h3 class="ssq-title2">选择区/县</h3>
                            <div class="ssq-container-box">
                                <div class="ssq-container-box-item flexbox" v-for="(item, index) in areaArr">
                                    <div class="ssq-item-letter">
                                        <span>{{item.letter}}</span>
                                    </div>
                                    <div class="flex">
                                        <div class="ssq-item flexbox" v-for="(list, index) in item.data" @click="choseArea(list)">
                                            <span>{{list}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 区 -->
                    </div>
                </div>
            </div>
        </transition>
        <!-- 选择省市区 -->
    </div>
</template>

<script>
    import data from '@/assets/lacation.json';

    export default {
        data() {
            return {
                defaultHeight: 0,
                region: false,    //控制遮罩层显示隐藏
                slideToggle: false,  //控制弹窗上滑弹出或下滑隐藏
                slideToggleHeight: 0,   //适配弹窗高度
                hotCityFlag: true,      //控制热门城市显示隐藏
                hotCity: ["北京","上海","广州","深圳","杭州","南京","苏州","天津","武汉","长沙","重庆","成都"],
                ssq: '',         //选择的省市区——字符串
                ssqChose: [],    //选择的省市区——数组
                provinceArr: [], //省
                cityArr: [],     //市
                areaArr: [],     //区
                provinceCityStorage: [],    //存放对应省的市
                sheng: false,    //控制“省”显示隐藏
                shi: false,      //控制“市”显示隐藏
                qu: false        //控制“区”显示隐藏
            }
        },
        mounted() {
            this.defaultHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //获取整屏高度
            this.getProvinc();
        },
        methods: {
            // 选择地区
            choseRegion() {
                this.region = !this.region;
                this.$nextTick(function () {
                    let zhezhaoHeight = this.$refs.zhezhao.clientHeight;
                    this.slideToggleHeight = this.defaultHeight - zhezhaoHeight;
                })
                this.slideToggle = !this.slideToggle;
            },
            // 关闭弹窗
            close() {
                this.region = !this.region;
                this.slideToggle = !this.slideToggle;
            },
            // 字母排序（从A-Z）
            pySort(arr,empty) {
                let that = this;
                if(!String.prototype.localeCompare)
                    return null;
                var letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
                var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
                var arrList = [];
                for(var m = 0;m < arr.length; m++) {
                    arrList.push(arr[m]);
                }
                var result = [];
                var curr;
                for(var i = 0;i < letters.length; i++){
                    curr = {letter: letters[i], data:[]};
                    if(i!=26){
                        for(var j = 0;j < arrList.length; j++){
                            var initial = arrList[j].charAt(0);
                            if(arrList[j].charAt(0) == letters[i] || arrList[j].charAt(0) == letters[i].toLowerCase()){
                                curr.data.push(arrList[j]);
                            }else if(zh[i] != '*' && that.isChinese(initial)){
                                if(initial.localeCompare(zh[i]) >= 0  && (!zh[i+1] || initial.localeCompare(zh[i+1]) < 0)) {
                                    curr.data.push(arrList[j]);
                                }
                            }
                        }
                    }else{
                        for(var k = 0;k < arrList.length; k++){
                            var ini = arrList[k].charAt(0);           //截取第一个字符
                            if(!that.isChar(ini) && !that.isChinese(ini)){
                                curr.data.push(arrList[k]);
                            }
                        }
                    }
                    if(empty || curr.data.length) {
                        result.push(curr);
                        curr.data.sort(function(a,b){
                            return b.localeCompare(a);       //排序,英文排序,汉字排在英文后面
                        });
                    }
                }
                return result;
            },
            isChinese:function(temp){
                var re=/[^\u4E00-\u9FA5]/;
                if (re.test(temp)){return false;}
                return true ;
            },
            isChar:function(char){
                var reg = /[A-Za-z]/;
                if (!reg.test(char)){return false ;}
                return true ;
            },
            // 获取省
            getProvinc() {
                this.hotCityFlag = true;
                this.sheng = true;
                this.shi = false;
                this.qu = false;
                let arr = [];
                for(let i = 0; i < data.length; i++){
                    arr.push(data[i].name);
                }
                this.provinceArr = this.pySort(arr);
            },
            // 选择省
            choseProvince(name) {
                let arr = [];  //定义空数组
                this.hotCityFlag = false;
                this.sheng = false;
                this.shi = true;
                this.qu = false;
                for(let i = 0; i < data.length; i++){
                    if( data[i].name == name ){
                        for(let j = 0; j < data[i].city.length; j++){
                            arr.push(data[i].city[j].name);
                            this.provinceCityStorage.push(data[i].city[j]);
                        }
                        this.cityArr = this.pySort(arr);
                    }
                }
                if(this.ssqChose.length < 0){  //判断往后添加省还是覆盖当前省
                    this.ssqChose.push(name);
                }else{
                    this.ssqChose[0] = name;
                }
                this.ssq = this.ssqChose.join('/');
            },
            // 选择市
            choseCity(name) {
                let arr = [];
                this.hotCityFlag = false;
                this.sheng = false;
                this.shi = false;
                this.qu = true;
                for(let i = 0; i < this.provinceCityStorage.length; i++){
                    if( this.provinceCityStorage[i].name == name ){
                        for(let j = 0;j < this.provinceCityStorage[i].area.length; j++){
                            arr.push(this.provinceCityStorage[i].area[j]);
                        }
                        this.areaArr = this.pySort(arr);
                    }
                }
                if(this.ssqChose.length < 1){  //判断往后添加市还是覆盖当前市
                    this.ssqChose.push(name);
                }else{
                    this.ssqChose[1] = name;
                }
                this.ssq = this.ssqChose.join('/');
            },
            // 选择区
            choseArea(name) {
                this.hotCityFlag = false;
                this.sheng = false;
                this.shi = false;
                if(this.ssqChose.length < 2){  //判断往后添加区还是覆盖当前区
                    this.ssqChose.push(name);
                }else{
                    this.ssqChose[2] = name;
                }
                this.region = !this.region;
                this.slideToggle = !this.slideToggle;
                this.ssq = this.ssqChose.join('/');
            },
            // 重新选择
            reSelection(index) {
                if(index == 0){
                    this.sheng = true;
                    this.shi = false;
                    this.qu = false;
                    this.ssqChose = this.ssqChose.slice(0,1);  //截取数组第一个
                }else if(index == 1){
                    this.sheng = false;
                    this.shi = true;
                    this.qu = false;
                    this.ssqChose = this.ssqChose.slice(0,2);  //截取数组前两个
                }else if(index == 2){
                    return false;
                }
                this.ssq = this.ssqChose.join('/');
            },
            // 选择热门城市
            choseHotCity(name) {
                this.hotCityFlag = false;
                this.sheng = false;
                this.shi = false;
                this.qu = true;

                for(let i = 0; i < data.length; i++){
                    for(let j = 0; j < data[i].city.length; j++){
                        if( name + '市' == data[i].city[j].name ){
                            this.ssqChose[0] = data[i].name;
                            this.ssqChose[1] = name + '市';
                            this.areaArr = this.pySort(data[i].city[j].area);
                        }
                        if( name == data[i].city[j].name ){
                            this.ssqChose[0] = data[i].name;
                            this.ssqChose[1] = name;
                            this.areaArr = this.pySort(data[i].city[j].area);
                        }

                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/mixin.scss";
    // 遮罩层
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    // 弹出层
    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }
    .slide-enter, .slide-leave-to{
        transform: translateY(12rem);
    }

    .box{
        @include padding(0.3rem,0.2rem,0.52rem,0.2rem);
        background: #FF8700;
    }
    .container{
        padding: 0 0.3rem;
        border-radius: 0.1rem;
        background: #FFF;
        .store-item{
            align-items: center;
            @include wh(100%,0.96rem);
            border-bottom: 1px dashed #DEDEDE;
            .choseRegion{
                align-items: center;
                height: 100%;
                padding-left: 0.3rem;
                font-size: 0.26rem;
                color: #000;
            }
            h3{
                font-size: 0.3rem;
                color: #000;
            }
            span{
                font-size: 0.26rem;
                color: #000;
            }
            .mendian{
                @include wh(0.68rem,0.68rem);
            }
            .more{
                width: 0.34rem;
            }
            .inp{
                font-size: 0.24rem;
                padding-left: 0.3rem;
                outline-style: none;
            }
        }
        .between{
            justify-content: space-between;
        }
        .btn{
            @include wh(6.5rem,0.98rem);
            margin-top: 1rem;
            text-align: center;
            line-height: 0.98rem;
            font-size: 0.34rem;
            color: #FFF;
            border-radius: 0.1rem;
            background: #FF8700;
        }
    }
    // 选择省市区
    .ssq-box{
        position: fixed;
        z-index: 10;
        @include wh(100%,100%);
        flex-direction: column;
        background: rgba(0,0,0,0.5);
        .zhezhao{
            height: 2.2rem;
        }
    }
    .ssq-wrap{
        flex-direction: column;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 20;
        border-radius: 0.1rem 0.1rem 0 0;
        background: #FFF;
        .ssq-wrap-top{
            justify-content: center;
            align-items: center;
            position: relative;
            @include wh(100%,1rem);
            .chose{
                font-size: 0.32rem;
                color: #000;
            }
            .close-img{
                position: absolute;
                right: 0.2rem;
                @include wh(0.26rem,0.26rem);
            }
        }
        .ssq-container{
            .ssq-title1{
                @include padding(0.43rem,0.2rem,0.4rem,0.2rem);
                font-size: 0.28rem;
                color: #999;
            }
            .ssq-title2{
                @include padding(0.40rem,0.2rem,0.1rem,0.2rem);
                font-size: 0.28rem;
                color: #999;
            }
            .hotCity-arr{
                flex-wrap: wrap;
                padding: 0 0.47rem;
                .hotCity-item{
                    padding: 0.32rem 0.52rem;
                    span{
                        font-size: 0.3rem;
                        color: #000;
                    }
                }
            }
        }
        .ssq-wrap-bottom{
            overflow-y: auto;
            &::-webkit-scrollbar { 
                display: none; 
                width: 0 !important; 
            }
            .step{
                padding: 0.3rem 0.2rem;
                border-bottom: 1px solid #DEDEDE;
                .step-title{
                    align-items: center;
                    font-size: 0.3rem;
                    color: #000;
                    &:last-child::before{
                        content: "";
                        display: block;
                        @include wh(0.16rem,0.16rem);
                        border-radius: 0.1rem;
                        margin-right: 0.5rem;
                        background: #FFF;
                        border: 1px solid #FF8700;
                        box-sizing: border-box;
                    }
                    &::before{
                        content: "";
                        display: block;
                        @include wh(0.16rem,0.16rem);
                        border-radius: 0.1rem;
                        margin-right: 0.5rem;
                        background: #FF8700;
                    }
                }
                .step-fu-title{
                    align-items: center;
                    height: 0.64rem;
                    &::before{
                        content: "";
                        display: block;
                        @include wh(0.02rem,0.9rem);
                        margin-left: 0.07rem;
                        background: #FF8700;
                    }
                }
            }
        }
    }
    .ssq-container-box{
        padding: 0 0.2rem;
        .ssq-item-letter{
            width: 0.2rem;
            text-align: center;
            font-size: 0.24rem;
            color: #5E5E5E;
            span{
                display: block;
                height: 0.92rem;
                line-height: 0.92rem;
            }
        }
        .ssq-item{
            align-items: center;
            height: 0.92rem;
            padding-left: 0.3rem;
            span{
                font-size: 0.3rem;
                color: #000;
            }
        }
    }
</style>
