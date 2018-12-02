//create model
var url = "http://localhost:3000/items";

// var Item = require('../../models/ItemsModel');
//axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.component("list", {
    props: ["items", "add", "remove"],
    template: '<ul class="collection with-header" v-if="items.length"><div class="teal-text text-darken-2"><li class="collection-header center teal teal-text text-lighten-4"><h4>Notepad</h4></li><li class="collection-item" v-for="(item, index) in items"><div class="section"> {{item.name}}  <button class="btn-small waves-effect waves-teal secondary-content" v-on:click="remove(item.id)">Remove</button></div></li></div></ul>'
})

new Vue({
    el: '#app',
    created: function(){
        this.getItems();
    },
    data: {
        maxId: 0,
        items:[],
        itemName: '',
        max: 20,
        loading: true,
        errored: false,
                    
    },
        
    mounted() {
                    
    },
        
    methods: {
        getItems: function(){
            // get items from database
            axios
                .get(url)
                .then(res => {
                    this.items = res.data;
                    for (var i = 0; i<this.items.length;i++) {
                        if (parseInt(this.items[i].id) > this.maxId) {
                            this.maxId = parseInt(this.items[i].id);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false)
        },

        remove(index) {
            axios.delete(url+'/'+index)
            .then(function (response) {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            });
            // reset max id, we might have deleted the object with highest id number
            this.maxId = 0;
            this.getItems(); // refresh items
            /*this.items.splice(index, 1);
            const parsed = JSON.stringify(this.items);
            localStorage.setItem('items', parsed);*/
        },
        
        add() {
            if (!this.checkInput(this.itemName)) {
                return;
            }
            // post item to list
            axios
            .post(url, {
                id: this.maxId+1,
                name: this.itemName
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            });
        
            this.itemName = '';
            this.getItems();
        },
        
        checkInput(itemName) {
            var re = /^[a-öA-Ö0-9., ]+$/;
            return re.test(itemName);
        },
        
    }
})