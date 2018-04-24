<template>
    <div>
        <PageHeader></PageHeader>
        <PageBread>Goods</PageBread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default" :class="{'cur': sortChecked === 'default'}" @click="checkSort('default')">Default</a>
                    <a href="javascript:void(0)" class="price" :class="{'cur': sortChecked === 'priceUp' ||  sortChecked === 'priceDown'}" @click="checkSort(isPriceUp?'priceDown':'priceUp')">Price
                        <span v-if="isPriceArrowUp">↑</span>
                        <span v-else>↓</span>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterBy">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': isShowFilterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a :class="{'cur': priceChecked === 'all'}" @click="checkPriceFilter('all')">All</a></dd>
                            <dd v-for="(item, index) in priceFilterList" :key="index" @click="checkPriceFilter(index)">
                                <a v-if="item.endPrice" href="javascript:void(0)" :class="{'cur': priceChecked === index}">{{item.startPrice}} - {{item.endPrice}}</a>
                                <a v-else href="javascript:void(0)" :class="{'cur': priceChecked === index}"> {{item.startPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in prdList" :key="item.productId">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="`../../../static/${item.productImage}`" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="isShowOverLay" @click="closeFilterBy"></div>
        <PageFooter></PageFooter>
    </div>
</template>

<script>
    import axios from 'axios'
    import PageHeader from '../../components/PageHeader.vue'
    import PageBread from '../../components/PageBread.vue'
    import PageFooter from '../../components/PageFooter.vue'
    export default{
        data(){
            return {
                prdList:[],
                priceChecked:'all',
                isShowOverLay:false,
                isShowFilterBy:false,
                sortChecked: 'default',
                isPriceUp: true,
                priceFilterList: [
                    {
                        startPrice: 0,
                        endPrice: 100
                    },
                    {
                        startPrice: 100,
                        endPrice: 500
                    },
                    {
                        startPrice: 500,
                        endPrice: 2000
                    },
                    {
                        startPrice: 2000
                    }
                ]
            }
        },
        components:{
            PageHeader,
            PageBread,
            PageFooter
        },
        computed:{
            isPriceArrowUp(){
                return !this.isPriceUp;
            }
        },
        created () {
            this.getProductList()
        },
        methods:{
            getProductList (params) {
                axios.get('mock/goods',{params:params}).then((res) => {
                    console.log(res);
                    let data = (res&&res.data)||{};
                    if (data.code='000') {
                        this.prdList = data.result || []
                        console.log(this.prdList);
                    }else{
                        alert(`err:${data.msg || '系统错误'}`)
                    }
                });
            },
            checkPriceFilter (index) {
                this.priceChecked = index;
                this.filterPrice = index === 'all' ? null : this.priceFilterList[index]
                this.getProductList(this.filterPrice);
                this.closeFilterBy();

            },
            // 展示过滤列表弹窗
            showFilterBy () {
                this.isShowFilterBy = true;
                this.isShowOverLay = true;
            },
            // 关闭过滤列表弹窗
            closeFilterBy () {
                this.isShowFilterBy = false;
                this.isShowOverLay = false;
            },
            checkSort (val) {
                this.sortChecked = val;
                if (val === 'priceUp' || val === 'priceDown') {
                    this.isPriceUp = !this.isPriceUp
                } else {
                    this.isPriceUp = true
                }
                this.getPrdList()
            }
        }
    }
</script>