import GhostContentAPI from '@tryghost/content-api'

const ghostAPI = new GhostContentAPI({
    url: 'https://blog.ubumaths.net',
    key: '8f04d2c9a197a6c0097316afd5',
    version: "v3"
  });

export default ghostAPI
