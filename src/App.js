import React, {useEffect, useState, useRef} from "react";
import HomePage from "./routes/HomePage"
import ProductPage from "./routes/ProductPage"
import LoginPage from "./routes/LoginPage";
import Navbar from "./components/navbar/Navbar";



const heroku_auth_site = "https://cors-anywhere.herokuapp.com/https://ims-na1.adobelogin.com/ims/exchange/jwt/"
// const heroku_auth_site = `https://api.allorigins.win/get?url=${encodeURIComponent('https://ims-na1.adobelogin.com/ims/exchange/jwt/')}`
const herkou_offer_site = "https://cors-anywhere.herokuapp.com/https://platform.adobe.io/data/core/ode/c9f63dfc-cae7-355f-80dc-5bfddde8462b/decisions"
// const herkou_offer_site = `https://api.allorigins.win/get?url=${encodeURIComponent('https://platform.adobe.io/data/core/ode/c9f63dfc-cae7-355f-80dc-5bfddde8462b/decisions')}`
const AuthTokenContext = React.createContext()
const DiscountContext = React.createContext()

function App() {

  const auth_token_ref = useRef(null)
  const location_discount_ref = useRef(0)
  const [imgUrl, setImgUrl] = useState(null)

  const [flag, setFlag] = useState(false)
  const [user, setUser] = useState(null)

  const [showInsurancePage , setShowInsurance] = useState(false)
  
  // getting the access token in useEffect
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Request-Origin", "*");
    myHeaders.append("Access-Control-Request-Methods", "*");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Headers", "*");
    myHeaders.append("Cookie", "ftrset=23; relay=1afe6768-c226-4e09-98fb-59214d32d08d");
    myHeaders.append("Access-Control-Allow-Methods" , "POST, GET, OPTIONS, DELETE, PUT")
    myHeaders.append("Access-Control-Allow-Headers" , "append,delete,entries,foreach,get,has,keys,set,values,Authorization")
    var formdata = new FormData();
    formdata.append("client_id", "cc606f2b448b452cb18fa8d5a9936589");
    formdata.append("client_secret", "p8e-LN5qOrJt2D998moYaBfxVvMsczYFuELV");
    formdata.append("jwt_token", "eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2Mzg2OTYzNTAsImlzcyI6IkQ4NDU3MzFENUIzMEI2MDEwQTQ5NUUyRUBBZG9iZU9yZyIsInN1YiI6IjM5RDA1N0YyNjE5NzM0Q0IwQTQ5NUZBRUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJhdWQiOiJodHRwczovL2ltcy1uYTEuYWRvYmVsb2dpbi5jb20vYy9jYzYwNmYyYjQ0OGI0NTJjYjE4ZmE4ZDVhOTkzNjU4OSIsImh0dHBzOi8vaW1zLW5hMS5hZG9iZWxvZ2luLmNvbS9zL2VudF9kYXRhc2VydmljZXNfc2RrIjp0cnVlfQ.VY9Cqq0QxXpIER8elz-FgBvybSBVAmZXSn2wcs4huT5hQMJ_7OaOdSzxqcqrQ5I5dsaICaXshjb1SBZK6ltmy5fUWqZVw-3bqGWzRH0x3ipUU3ZbKNI5p3Q0dD7WLUTp4RpqbuSsumP-C9hjFUScIJ8yrnUuPBPpQmCffYif9_PSSTTZqIY8uzzR-1r78a55mibTomZolYA9P3t5qdc0Z-A3VTsUlDhJmzWOAY4g35ShEymYVoxNlRYv_bNuoAmNqYfCX5zRpZfwbox-i306DperDTvV5unM6bmWb4Gm4xy1iuRkVCB2JM6PSepObdkmZn6rVlDkEp9J62EyB7DZlQ");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    redirect: 'follow'
  };


    fetch(heroku_auth_site, requestOptions)
    .then(response => response.text())
    .then(result => {
      let obj =  JSON.parse(result)
      const auth_token = obj.access_token
      auth_token_ref.current = auth_token
      // console.log(`auth token ::: ${auth_token}`)
    })
    .catch(error => console.log('error', error));
  }, [])

   //using the access token if the user is authenticated
   useEffect(() => {
    console.log("HAPPENINGGGG")
    if (flag){
      console.log("Happening 2")
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/vnd.adobe.xdm+json; schema=\"https://ns.adobe.com/experience/offer-management/decision-response;version=1.0\"");
      myHeaders.append("Content-Type", "application/vnd.adobe.xdm+json; schema=\"https://ns.adobe.com/experience/offer-management/decision-request;version=1.0\"");
      myHeaders.append("Authorization", `Bearer ${auth_token_ref.current}`);
      myHeaders.append("x-api-key", "cc606f2b448b452cb18fa8d5a9936589");
      myHeaders.append("x-gw-ims-org-id", "D845731D5B30B6010A495E2E@AdobeOrg");
      myHeaders.append("x-sandbox-name", "prod");

      var raw = "{\n        \"xdm:propositionRequests\": [\n            {\"xdm:activityId\":\"xcore:offer-activity:1450a31a3fe1dcf9\",\"xdm:placementId\":\"xcore:offer-placement:144ff11e017dc682\"}\n        ],\n        \"xdm:profiles\": [\n            {\n              \"xdm:identityMap\": {\n                \"ECID\": [\n                {\n                    \"xdm:id\": \"38914807724379303500755637099652659557\"\n                }\n                ]\n            },\n            \"xdm:decisionRequestId\": \"0AA00002-0000-1337-c0de-c0fefec0fefe\"\n            }\n        ],\n        \"xdm:allowDuplicatePropositions\": {\n            \"xdm:acrossActivities\": true,\n            \"xdm:acrossPlacements\": true\n        },\n        \"xdm:mergePolicy\": {            \n            \"xdm:id\": \"179e6e0a-8553-4570-9399-81d0b3c4ebb4\"\n        },\n        \"xdm:responseFormat\": {\n            \"xdm:includeContent\": true,\n            \"xdm:includeMetadata\": {\n            \"xdm:activity\": [\n                \"name\"\n            ],\n            \"xdm:option\": [\n                \"name\"\n            ],\n            \"xdm:placement\": [\n                \"name\"\n            ]\n            }\n        }\n      }";

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(herkou_offer_site, requestOptions)
        .then(response => response.text())
        .then(result => {
          let obj = JSON.parse(result)
          let location_discount = obj["xdm:propositions"][0]["xdm:options"][0]["xdm:name"]
          location_discount = location_discount.split(" ")[2]
          location_discount_ref.current = location_discount
          let image_url = obj["xdm:propositions"][0]["xdm:options"][0]["xdm:deliveryURL"]
          console.log("fetchchscs src  "  + image_url)
          setImgUrl(image_url)
        })
        .catch(error => console.log('error', error));
          }
  } , [flag])



  // console.log(flag, showInsurancePage)

  let componentToShow = (showInsurancePage, flag) => {
    if (!showInsurancePage && flag) {
      return(
        <AuthTokenContext.Provider value={auth_token_ref.current}>
          <HomePage user={user} setShowInsurance={setShowInsurance}/>
        </AuthTokenContext.Provider>
      )
    }
    else if (showInsurancePage && flag){
      return(
        <AuthTokenContext.Provider value={auth_token_ref.current}>
          <DiscountContext.Provider value={location_discount_ref.current}>
            <ProductPage user={user} location_discount={location_discount_ref.current} setShowInsurance={setShowInsurance}/>
          </DiscountContext.Provider>
        </AuthTokenContext.Provider>
      )
    }
  }

  if (!flag){
    return (
      <AuthTokenContext.Provider value={auth_token_ref.current}>
        <LoginPage setFlag={setFlag} setUser={setUser}/>
      </AuthTokenContext.Provider>
    )
  }
  else{
    return(
      <>
      <Navbar user={user} setShowInsurance={setShowInsurance} image_url={imgUrl}/>
      {componentToShow(showInsurancePage, flag)}
      </>
    )
  }

}

export default App;
export {AuthTokenContext, DiscountContext}