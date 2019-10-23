class Utils{
  static validateYouTubeUrl(url){
      if (url && (url !== undefined || url !== '')) {
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match && match[2].length === 11) {
              return match[2]
          }
      }
      return null
  }

  static getRandomNumber(){return Math.floor(Math.random() * 10000)}

  static updateStateField(key, value){
    this.setState({
      [key]: value
    })
  }

  static get ERROR_MESSAGE(){return "Error processing request. Please contact admin."}

  static Request = class{
      static abortController = null
      constructor(api_address=process.env.REACT_APP_LOOPBACK_IP){
        this.headers = {'Content-Type': 'application/json'}
        this.api_address = api_address
      }

      setAuthorization(token){
        this.headers['Authorization'] = token;
      }

      setOtherHeader(key, value){
        this.headers[key] = value;
      }

      static abortProcesses(){
        if(Utils.Request.abortController != null){
            Utils.Request.abortController.abort();
        }
      }

      GET(endpoint){
        Utils.Request.abortController = new AbortController()
        try{
            return fetch(this.api_address + endpoint, {
              signal: Utils.Request.abortController.signal,
              headers:this.headers
            });
        }catch(err){
          alert( Utils.ERROR_MESSAGE + err)
          return null;
        }
      }

      POST(endpoint, body){
        Utils.Request.abortController = new AbortController()
        try{
          return fetch(this.api_address + endpoint, {
            signal: Utils.Request.abortController.signal,
            method: "POST",
            headers: this.headers,
            body: body
          });
        }catch(err){
            alert(Utils.ERROR_MESSAGE + err)
            return null;
        }
      }


      PUT(endpoint, body){
        Utils.Request.abortController = new AbortController()
        try{
          return fetch(this.api_address + endpoint, {
            signal: Utils.Request.abortController.signal,
            method: "PUT",
            headers: this.headers,
            body: body
          });
        }catch(err){
            alert(Utils.ERROR_MESSAGE + err)
            return null;
        }
      }

      PATCH(endpoint, body){
        Utils.Request.abortController = new AbortController()
        try{
          return fetch(this.api_address + endpoint, {
            signal: Utils.Request.abortController.signal,
            method: "PATCH",
            headers: this.headers,
            body: body
          });
        }catch(err){
            alert(Utils.ERROR_MESSAGE + err)
            return null;
        }
      }
   }

   static listenToStorageSet(handler){
     if(typeof handler !== "function"){
       alert('ERROR: listenToLocalStorage was expecting a function but receive other type.')
     }
     Storage.prototype._setItem = Storage.prototype.setItem;
     Storage.prototype.setItem = function(key, value){
       var evt = new CustomEvent('storageSet', {detail: {type: 'set', key: key, value: value}});
       window.dispatchEvent(evt);
       this._setItem(key, JSON.stringify(value));
     }
     window.addEventListener('storageSet', handler, true)
   }

   static listenToStorageClear(handler){
     if(typeof handler !== "function"){
       alert('ERROR: listenToLocalStorage was expecting a function but receive other type.')
     }
     Storage.prototype._clear = Storage.prototype.clear;
     Storage.prototype.clear = function(){
       var evt = new CustomEvent('storageClear', {detail: {type:'clear'}})
       window.dispatchEvent(evt);
       this._clear();
     }
     window.addEventListener('storageClear', handler, true)
   }

}

export default Utils;
