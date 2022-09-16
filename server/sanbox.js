function diff_hours(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

dt1 = new Date();
dt2 = new Date("2022-09-13T14:16:23.396Z");
console.log(diff_hours(dt1, dt2));

const getHaversineDistance = (firstLocation, secondLocation) => {
  const earthRadius = 6371; // km 

  const diffLat = (secondLocation.lat-firstLocation.lat) * Math.PI / 180;  
  const diffLng = (secondLocation.lng-firstLocation.lng) * Math.PI / 180;  

  const arc = Math.cos(
                  firstLocation.lat * Math.PI / 180) * Math.cos(secondLocation.lat * Math.PI / 180) 
                  * Math.sin(diffLng/2) * Math.sin(diffLng/2)
                  + Math.sin(diffLat/2) * Math.sin(diffLat/2);
  const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1-arc));

  const distance = earthRadius * line; 

  return distance;
}

const philly = { lat: 39.9526, lng: -75.1652 }
const nyc = { lat: 40.7128, lng: -74.0060 }
const losAngeles = { lat: 34.0522, lng: -118.2437 }
const jakarta = { lat: 106.81201425438192, lng: -6.1789728520833 }


console.log(getHaversineDistance(jakarta, nyc)) //129.61277152662188
// console.log(getHaversineDistance(philly, losAngeles)) //3843.4534005980404


