var app = new Vue({
    el: '#app',
    data: {
        name: '',
        isOpen:true,
        data: [{
                id: 'blackcat',
                name: "黑猫",
            },
            {
                id: 'whitecat',
                name: "白猫",
            },
            {
                id: 'bronya',
                name: "bronya",
            },
            {
                id: 'contender',
                name: "contender",
            },
            {
                id: 'haru',
                name: "haru",
            },
            {
                id: 'kanzaki',
                name: "kanzaki",
            },
            {
                id: 'kesyoban',
                name: "kesyoban",
            },
            {
                id: 'kp31 2',
                name: "kp31 2",
            },
            {
                id: 'mai',
                name: "mai",
            },
            {
                id: 'rem',
                name: "rem",
            },
            {
                id: 'tia',
                name: "tia",
            },
            {
                id: 'velet',
                name: "velet",
            },
        ],
        oldModel: "",
        model: "",
        prohibitDomainName:"",
    },
    watch: {},
    created() {
        chrome.storage.sync.get('siquxiongdiName', (res) => {
            this.name = res['siquxiongdiName'];
        });
        chrome.storage.sync.get('siquxiongdiModel', (res) => {
            this.model = res['siquxiongdiModel'];
            this.oldModel = res['siquxiongdiModel'];
        });
        chrome.storage.sync.get('siquxiongdiProhibitDomainName', (res) => {
            this.prohibitDomainName = res['siquxiongdiProhibitDomainName'];
        });
    },
    methods: {
        nameSave() {
            chrome.storage.sync.set({
                'siquxiongdiName': this.name,
                'siquxiongdiModel': this.model,
                'siquxiongdiProhibitDomainName':this.prohibitDomainName
            }, () => {
                if (this.oldModel !== this.model) {
                    let model_url = 'https://cdn.jsdelivr.net/gh/fangyeqing123/chromeModle@0.0.4/' + this.model + '/model.json';
                    this.sendMessageToContentScript({
                        cmd: 'replaceModel',
                        value: model_url
                    }, (response) => {
                        this.oldModel = this.model;
                        alert('保存成功')
                    });
                }
            });
        },
        sendMessageToContentScript(message, callback) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                    if (callback) callback(response);
                });
            });
        }
    },
})