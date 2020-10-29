import Axios from "../../node_modules/axios/index";
import axios, { AxiosResponse,AxiosError} from "../../node_modules/axios/index"
import { ICar } from "./ICar";

 let button :HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
 let url : string = "https://webapicar20190326034339.azurewebsites.net/api/cars";
 var list : HTMLUListElement = <HTMLUListElement> document.getElementById("carList")
 let getOneButton :HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneButton");
 var delButton :HTMLButtonElement = <HTMLButtonElement> document.getElementById("delButton");


 button.addEventListener("click", (e:Event) =>getAll());
 getOneButton.addEventListener("click", (e:Event) => getOne())
 delButton.addEventListener("click", (e:Event) => Delete())


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
         let newNodeText : string = car.model + " " + car.vendor + " " + car.price;
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
    var vendor = (document.getElementById("vendorInput") as HTMLInputElement).value
    var model =(document.getElementById("modelInput") as HTMLInputElement).value
    var price = (document.getElementById("priceInput") as HTMLInputElement).value
    Axios
 }