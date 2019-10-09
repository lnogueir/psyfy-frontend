class Request{
  constructor(url, header, body=null){
    this.url = url;
    this.header=header;
    this.body=body;
  }

  function GET(params=[]){
    return fetch(this.url).then(response=>response.json())
  }
}
