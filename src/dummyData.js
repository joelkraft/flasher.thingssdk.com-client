const processData = data => (
     data.options.reduce((arr, man) => {
        const { name } = man;
        const rows = man.versions.map(version => {
            return { ...version, name };
        });
        return arr.concat(rows);
    }, [])
 );

const data = {
    "options":[
        {
            "name":"Smart.js",
            "versions":[
                {
                    "version":"Beta 3 \"Fat Rabbit\", 2016-03-24",
                    "board":"ESP8266",
                    "revision":"ESP-12",
                    "manifest":"http://localhost:3000/v2/manifests/5844e17dee852bf83378fdb3",
                    "latest":false
                }
            ]
        },
        {
            "name":"Espruino",
            "versions":[
                {
                    "version":"1v85",
                    "board":"ESP8266",
                    "revision":"ESP-12",
                    "manifest":"http://localhost:3000/v2/manifests/5844e17dee852bf83378fd9f",
                    "latest":false
                },
                {
                    "version":"1v86",
                    "board":"ESP8266",
                    "revision":"ESP-12",
                    "manifest":"http://localhost:3000/v2/manifests/5844e17dee852bf83378fda4",
                    "latest":false
                },
                {
                    "version":"1v87",
                    "board":"ESP8266",
                    "revision":"ESP-12",
                    "manifest":"http://localhost:3000/v2/manifests/5844e17dee852bf83378fda9",
                    "latest":false
                },
                {
                    "version":"1v88",
                    "board":"ESP8266",
                    "revision":"ESP-12",
                    "manifest":"http://localhost:3000/v2/manifests/5844e17dee852bf83378fdae",
                    "latest":false
                }
            ]
        }
    ]
}

export default processData(data);