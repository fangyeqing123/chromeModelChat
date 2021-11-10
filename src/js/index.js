! function () {
    let cattype = "whitecat";
    let myName = '';
    let model = '';
    let prohibitDomainName = '';
    let isShow = true;
    chrome.storage.sync.get('siquxiongdiName', (res) => {
        myName = res['siquxiongdiName'];
    });
    chrome.storage.sync.get('siquxiongdiModel', (res) => {
        model = res['siquxiongdiModel'];
    });
    chrome.storage.sync.get('siquxiongdiProhibitDomainName', (res) => {
        let prohibitDomainNameArray = [],
            prohibitDomainNameIndex = null;
        prohibitDomainName = res['siquxiongdiProhibitDomainName'] || '';
        prohibitDomainNameArray = prohibitDomainName.split(';');
        prohibitDomainNameIndex = prohibitDomainNameArray.findIndex((item) => {
            return item === (window.location.protocol + "//" + window.location.host);
        })
        if (prohibitDomainNameIndex !== -1) {
            isShow = false;
        }
        if (isShow) {
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                if (request.cmd == 'replaceModel') {
                    let loadLive = document.createElement("script");
                    loadLive.innerHTML = '!function(){loadlive2d("siquxiongdi_live2d", "' + request.value + '");}()';
                    document.body.appendChild(loadLive);
                };
                sendResponse('我收到了你的消息！');
            });
    
            function setupCatPanel() {
                let contentBox = document.createElement('div');
                contentBox.id = "siquxiongdi_contentBox";
                let canvas = document.createElement('canvas');
                canvas.id = "siquxiongdi_live2d";
                canvas.dataset.myName = myName;
                canvas.width = 300;
                canvas.height = 600;
                canvas.style.width = '150px';
                canvas.style.position = "fixed";
                canvas.style.zIndex = 9999;
                canvas.style.right = '0px';
                canvas.style.bottom = '-10px';
                canvas.style.pointerEvents = 'none';
                canvas.style.filter = 'drop-shadow(0px 10px 10px #ccc)';
                contentBox.appendChild(canvas);
                document.body.appendChild(contentBox);
            }
    
            function setupModel() {
                let _cattype = model;
                if (_cattype) cattype = _cattype;
                let model_url = 'https://cdn.jsdelivr.net/gh/fangyeqing123/chromeModle@0.0.4/' + cattype + '/model.json';
    
                let loadLive = document.createElement("script");
                loadLive.innerHTML = '!function(){loadlive2d("siquxiongdi_live2d", "' + model_url + '");}()';
                document.body.appendChild(loadLive);
            }
    
            function injectCustomJs(jsPath, cb) {
                let temp = document.createElement('script');
                temp.setAttribute('type', 'text/javascript');
                temp.src = chrome.extension.getURL(jsPath);
                temp.onload = function () {
                    this.parentNode.removeChild(this);
                    if (cb) cb();
                };
                document.head.appendChild(temp);
            }
    
            injectCustomJs('js/live2d-mini.js', function () {
                setupCatPanel();
                setupModel();
    
                injectCustomJs('js/catroom.js', function () {
    
                });
            });
        }
    });
}()