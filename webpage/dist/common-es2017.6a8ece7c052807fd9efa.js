(self.webpackChunkangular_io_example=self.webpackChunkangular_io_example||[]).push([[592],{4154:function(t,e,r){"use strict";r.d(e,{d:function(){return p}});var n=r(1841),o=r(7716);const s="http://localhost:8080/skillsme/dev_projects";let p=(()=>{class t{constructor(t){this.http=t}getAll(){return this.http.get(s)}upload(t,e,r){const o=new FormData;o.append("file",e),o.append("isuploaded",r);const p=new n.aW("PUT",`${s}/${t}`,o,{reportProgress:!0,responseType:"text"});return console.log(p),console.log(o),this.http.request(p)}create(t){return this.http.post(s,t)}update(t,e){return this.http.put(`${s}/${t}`,e)}delete(t){return this.http.delete(`${s}/${t}`)}deleteAll(){return this.http.delete(s)}get(t){return this.http.get(`${s}/${t}`)}findByCurrentprojectId(t){return this.http.get(`${s}/projectId?projectId=${t}`)}findByCurrentAccountPro(t){return this.http.get(`${s}?accountId=${t}`)}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(n.eN))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},1657:function(t,e,r){"use strict";r.d(e,{k:function(){return p}});var n=r(1841),o=r(7716);const s="http://localhost:8080/skillsme/feedback_files";let p=(()=>{class t{constructor(t){this.http=t}pushFileToStorage(t,e){const r=new FormData;r.append("file",t),r.append("dev_projectId",e);const o=new n.aW("POST",`${s}/upload`,r,{reportProgress:!0,responseType:"text"});return console.log(o),console.log(r),this.http.request(o)}getFiles(){return this.http.get(`${s}/info`)}deleteFile(t){return this.http.delete(`${s}/${t}`)}deleteAll(){return this.http.delete(s)}getFilesbyDevID(t){return this.http.get(`${s}/info?dev_projectId=${t}`)}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(n.eN))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);