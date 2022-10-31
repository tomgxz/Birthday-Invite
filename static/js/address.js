var addressField1 = document.getElementById("input_address_1");
var addressField2 = document.getElementById("input_address_2");
var addressField3 = document.getElementById("input_address_3");
var addressField4 = document.getElementById("input_address_4");
var addressField5 = document.getElementById("input_address_5");
var addressField6 = document.getElementById("input_address_6");

var addressFields = [addressField1,addressField2,addressField3,addressField4,addressField5,addressField6]

function initAutocomplete() {
    console.log("initAutocomplete starting...")
    autoComplete = new google.maps.places.Autocomplete(addressField1, {
        componentRestrictions: { country: ["us","ca","uk"] },
        fields: ["address_components","geometry"],
    });

    autoComplete.addListener("place_changed",fillInAddress);

    console.log("initAutocomplete finished")
}

function fillInAddress() {
    console.log("fillInAddress starting...")
    var place=autoComplete.getPlace();
    var address1="";
    var postcode="";

    addressField1.value="";
    addressField2.value="";
    addressField3.value="";
    addressField4.value="";
    addressField5.value="";
    addressField6.value="";

    for (var component of place.address_components) {
        var componentType = component.types[0]
        console.log(componentType)
        switch (componentType) {

          case "street_number": { address1=`${component.long_name} ${address1}`; break }
          case "route": { address1+=component.short_name; break }
          case "postal_code": { postcode = `${component.long_name}${postcode}`; break}
          case "postal_code_suffix": { postcode = `${postcode}-${component.long_name}`; break }
          case "locality": { addressField3.value = component.long_name; break }
          case "administrative_area_level_2": { addressField4.value = component.short_name; break }
          case "administrative_area_level_3": { addressField2.value = component.short_name; break }
          case "country": { addressField6.value = component.long_name; break }

        }
    }

    addressField1.value=address1;
    addressField5.value=postcode;

    addressField2.focus()

    console.log("fillInAddress finished")
}

document.getElementById("input_name").focus()
