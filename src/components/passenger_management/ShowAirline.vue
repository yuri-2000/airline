<template>
    <div>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>

<script>
    export default {
        name: "ShowAirline",
        props:["alerter"],
        data: function () {
            return {
                flight_num: "",
                start_time: "",
                arrive_time: "",
                rest: "",
                price: "",
                items: [
                    {
                        航班号: this.flight_num,
                        出发时间: this.start_time,
                        抵达时间: this.arrive_time,
                        余票量: this.rest,
                        价格: this.price,
                    }
                ]
            }
        },
        methods: {
            // 展示所有符合条件的航班
            get_airline: function(){
                this.$axios({
                    url: this.serverURL + "passenger/get_passenger_info",
                    method: "post",
                    data: {
                        start: this.$cookies.get("start"),
                        destination: this.$cookies.get("destination"),
                    },
                })
                // .then((response) => {
                //     let data = response.data;
                //     if(data.success) {
                //     }
                // });
            }
        }
    }
</script>

<style scoped>

</style>