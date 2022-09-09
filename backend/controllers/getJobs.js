const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')
const pcheerio = require('pseudo-cheerio')
class Jobs {
  constructor() {
    
 
  }
  async getJobs(url){
    var listingHtmlArr = []
    
    try {
        let title = ""
        
        await axios.get(url).then(res=>{
    
    var $ = cheerio.load(res.data)
    var elemSelector = 'body > div > div > main > div > div > section.block.mb-6.text-gray-700 > div > div > div'

 $(elemSelector).children().each((childIdx,childElem)=>{
    let newListing = ($(childElem).find('h2'))
   let tempArr = $(newListing).attr('x-data').split('}')
   title = tempArr[0].split('string:')[1].split("'")[1]

   tempArr = $(childElem).find('a')
   let jobLink = $(tempArr[tempArr.length-1]).attr('href')
   let company = $(tempArr[0]).attr('href').split('/')[3]
   
   var skillArr = []
 $(childElem).find('li').children().each((idx,elem)=>{
    skillArr.push($(elem).attr('href').split('/')[2])
  })
 
  var linksText =[]
$(childElem).find('a').each((idx,elem)=>{
  linksText.push($(elem).text())
})
let location = (linksText[linksText.length-3].trim())

var time = Date()
$(childElem).find('script').each((idx,elem)=>{
 time = $(elem).text().split("'")[1]
})

listingHtmlArr.push({title, jobLink, company,skillArr,location,time})
 })


 
  /* let links = $("body > div > div > main > div > div > section.block.mb-6.text-gray-700 > div > div > div > div > div.flex.overflow-hidden.flex-grow.justify-between.pt-4.w-full.h-16.border-t.border-gray-300.border-solid.box-border > div:nth-child(2) > div > div:nth-child(2) > a")
   for(var i =0; i < links.length; i++){
    listingHtmlArr.push($(links[i]).attr('href'))
   }
   console.log(listingHtmlArr)
  links.children().each((childIdx, childElem)=>{
    
  })*/


})

return listingHtmlArr

    } catch (error) {
        
    }
}
  async getSpecificJob(url){
    var jobType = ''
    var descriptionArr = []
    let applicationLink = ''
    try {
   
      await axios.get(url).then(res=>{
      
        const $ = cheerio.load(res.data)
        
      
        $('#description').children().each((childIdx,childElem)=>{
          
           if(childElem.name =='ul'){
               $(childElem).children().each((idx,elem)=>{
                  descriptionArr.push('--'+$(elem).text()) 
               })
           }else{
            
            descriptionArr.push($(childElem).text()) 
             
           }
           
           
          }) 
         
         $('body').find('p').each((idx,elem)=>{
         
          if(idx ==3){
           jobType = $(elem).text().trim()
   
          }
          
         
          })
          
          let tempArr = []
          $('body').find('.mb-8.mx-2').children((childIdx,childElem)=>{
           tempArr.push($(childElem).attr('href'))
          })
          applicationLink = tempArr[0]
     })
    } catch (error) {
     
    }
   
  return {jobType, descriptionArr,applicationLink}
  }
}







module.exports = Jobs