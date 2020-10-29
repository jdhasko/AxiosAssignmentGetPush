import Axios from "../../node_modules/axios/index";
import axios, { AxiosResponse,AxiosError} from "../../node_modules/axios/index"
import { ICar } from "./ICar";

 let button :HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
 let url : string = "https://webapicar20190326034339.azurewebsites.net/api/cars";
 var list : HTMLUListElement = <HTMLUListElement> document.getElementById("carList")
 let getOneButton :HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneButton");
 var delButton :HTMLButtonElement = <HTMLButtonElement> document.getElementById("delButton");
   var addButton :HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");

 button.addEventListener("click", (e:Event) =>getAll());
 getOneButton.addEventListener("click", (e:Event) => getOne())
 delButton.addEventListener("click", (e:Event) => Delete())
 addButton.addEventListener("click", (e:Event) => Post())



function Delete():void
{
   let deleteID = (document.getElementById("delIdContainer") as HTMLInputElement).value;

   axios.delete<ICar>(url + "/"+deleteID)
   .then(function(response:AxiosResponse<ICar>):void
   {
      alert("Object deleted.")
   })
   .catch(function (error:AxiosError) : void
   {
console.log("Error: "+ error);
   })
}


 function getOne():void
 { let getOneID  =  (document.getElementById("idContainer") as HTMLInputElement).value;

    Axios.get<ICar>(url+"/"+getOneID)
    .then(function(response:AxiosResponse<ICar>):void
    {
      let car : ICar = response.data;
      let newParagraph : HTMLParagraphElement = document.createElement("p");
      let newNodeText : string = response.data.id + " " + car.vendor + " " + car.price;
      let getOneSection = document.getElementById("getOne");
      newParagraph.innerText=newNodeText;
      getOneSection.appendChild(newParagraph);
      
    })
    .catch(function (error:AxiosError) : void
    {
      console.log("Error: "+ error);
    })
 }

 function getAll() : void
 {
   while( list.firstChild ){
      list.removeChild( list.firstChild );
    }

    Axios.get<ICar[]>(url).then(function (response:AxiosResponse<ICar[]>):void
    {

      response.data.forEach((car: ICar ) =>
      {
         let newNode : HTMLLIElement = <HTMLLIElement> document.createElement("LI");
         let newNodeText : string = "#"+car.id+"\t"+car.model + "\t" + car.vendor + "\t" + car.price;
         newNode.innerHTML = newNodeText;
         list.appendChild(newNode);
      });
    })
    .catch(function (error:AxiosError) : void
    {
console.log("Error: "+ error);
    })
 }

 function Post()
 {
    var vendor :string = (document.getElementById("vendorInput") as HTMLInputElement).value
    var model:string =(document.getElementById("modelInput") as HTMLInputElement).value
    var price :number = +(document.getElementById("priceInput") as HTMLInputElement).value
   let newCar = {
      price = +this.price,vendor = this.vendor,model = this.model;
   }
 
    axios.post<ICar>(url,
      {model:model,vendor:vendor,price:price}
      ).then(function(response : AxiosResponse):void
    {
      alert(vendor +"\t"+ model +" successfully added!")
    })
    .catch(function(error:AxiosError):void
    {
      alert(error);
      
    }
    )

    
 }