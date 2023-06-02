import Header from "./Header";
import axios from "axios";

function SearchPage() {
    
    function clearPage(toClear){
      while(toClear.firstChild){
        toClear.removeChild(toClear.firstChild);
      }
    }

    return (
      <div className="SearchPage">
        <Header />
        <body id="contents">
          <input type = "text" id = "input"/>
          <button onClick={async () => {

              const titleInput = document.getElementById("input").value;
              const options = {
                method: 'GET',
                url: 'https://streaming-availability.p.rapidapi.com/v2/search/title',
                params: {
                  title: titleInput,
                  country: 'ca',
                  show_type: 'movie',
                  output_language: 'en'
                },
                headers: {
                  'X-RapidAPI-Key': '0213f8300amsh78ad1a66494a92ep1f49a7jsn90fdedb088eb',
                  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(options);
                //console.log(response.data);
                let printRes = document.getElementById("printRes");
                clearPage(printRes);
                const results = response.data["result"];
                for(let i = 0; i<results.length; i++){
                  let newEntry = document.createElement("a");
                  console.log(results[i]);
                  newEntry.innerHTML = results[i]["title"] + ", " + results[i]["year"];
                  newEntry.href = "/movie?title=" + results[i]["title"] + "&year=" + results[i]["year"];
                  printRes.appendChild(newEntry); 
                }
                console.log(response.data["result"])
                return JSON.stringify(response.data);
              } catch (error) {
                console.error(error);
              }
              
              //const response = (await fetch("/title"));
              //let movieList = await response.json();
            }
            }>Press Me </button>


            <li id = "printRes"/>
          </body>
      </div>
    );
  }
  
  export default SearchPage;