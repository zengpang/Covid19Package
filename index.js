const axios = require(`axios`);

//https://c.m.163.com/ug/api/wuhan/app/data/list-total
function getCovidInfo(statename, provinceName) {

   return new Promise((resolve, reject) => {
      axios.get(`https://c.m.163.com/ug/api/wuhan/app/data/list-total`)
         .then(response => {
            let reslut = getprovinceCovidInfo(statename, provinceName, response.data.data.areaTree);
            resolve(reslut);
         })
         .catch(e => {
            console.log(e);
            reject(`网络异常`);
         }
         )
   })
}
//获取省新冠信息
function getprovinceCovidInfo(statename = `中国`, provinceName, data)
{
   let statInfo = null;
   let provinceInfo = null;
   try {
      statInfo = data.find(item => {
         return item.name == statename;
      })
      if (!statInfo) {
         return `未找到该国家信息`;
      }
      if(!statInfo.children)
      {
         return `该国家不存在省`;
      }
      statInfo.children.forEach(province => {
         console.log(province.name);
         if(province.name==provinceName)
         {
            provinceInfo=province;
            return;
         }
        
      });
     
   } catch {

   }
 
   if (!provinceInfo) {
      return `未找到该省信息`;
   }
   return provinceInfo;
}
//获取城市新冠信息
function getCityCovidInfo(statename = `中国`, cityName, data) {
   let statInfo = null;
   let cityInfo = null;
   try {
      statInfo = data.find(item => {
         return item.name == statename;
      })
      if (!statInfo) {
         return `未找到该国家信息`;
      }
      if(!statInfo.children)
      {
         return `该国家不存在省`;
      }
      statInfo.children.forEach(province => {
         //考虑到可能会出现省市同级的情况，比如北京
         if(province.name==cityName)
         {
            cityInfo=province;
            return;
         }
         province.children.forEach(city=>{
            
            if(city.name==cityName)
            {
               
               cityInfo=city;
               return;
            }
         })
      });
     
   } catch {

   }
 
   if (!cityInfo) {
      return `未找到该城市信息`;
   }
   return cityInfo;
}
module.exports = getCovidInfo;