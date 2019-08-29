const express = require('express');
const cors = require('cors');
const app = express();

const a = require('axios');
const uuid = require('uuid');

app.use(cors());
app.use(express.json());

async function getAutocomplete(input) {
    try {
      const res = await a.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyDCaZJ5l-dUK6_eK7NBiIOdW6zBoxmpMWw&sessiontoken=${uuid()}&geometry`
      );
      console.log(JSON.stringify(res.data, null, 2));
      return res.data.predictions[0].description;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  
  async function getGeo(input) {
    try {
      const res = await a(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDCaZJ5l-dUK6_eK7NBiIOdW6zBoxmpMWw&sessiontoken`
      );
      return res.data.candidates[0].geometry.location;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }



  app.post('/api/auto', async (req, res) => {
    const { input } = req.body;
    const result = await getAutocomplete(input);
    console.log(result)
    const geo = await getGeo(result);
    res.status(200).json({ input, geo });
  });

  app.listen(5000);