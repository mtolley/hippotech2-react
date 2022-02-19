const mortgage1 = {
  id: 1,
  address1: '1 Alabaster Avenue',
  status: 'Approved',
  purchasePrice: 500000,
  amountToBorrow: 400000,
  history: [
    {
      id: 1,
      date: '2020-01-05',
      party: 'Customer',
      event: 'Created',
      details: 'Submitted for approval'
    },
    {
      id: '2',
      date: '2020-01-05',
      party: 'HippoTech',
      event: 'Agreement in Principal',
      details: 'Agreement in principal subject to lender checks and property valuation'
    }
  ]
};


const mortgage2 = {
  id: 2,
  address1: '35 Broad Street',
  status: 'Approval Pending',
  purchasePrice: 850000,
  amountToBorrow: 700000,
  history: [
    {
      id: 1,
      date: '2020-01-05',
      party: 'Customer',
      event: 'Created',
      details: 'Submitted for approval'
    },
    {
      id: '2',
      date: '2020-01-05',
      party: 'HippoTech',
      event: 'Agreement in Principal',
      details: 'Agreement in principal subject to lender checks and property valuation'
    }
  ]
};

async function fakeLatencyAsync() { 
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}

export default class FakeServer {
  constructor() {
    this.authToken = null;
    this.username = null;
    
    this.myMortgages = new Map();
    this.myMortgages.set(mortgage1.id, mortgage1);
    this.myMortgages.set(mortgage2.id, mortgage2);
    
    this.nextMortgageId = 3;

    console.log('FakesServer constructor');
  }

  isLoggedIn() { return !!this.authToken; }

  async loginAsync(username, password) {
    console.log('loginAsync');
    if (username === "mtolley@synopsys.com" && password === "password") {
      this.authToken = "12345";
      this.username = "mtolley@synopsys.com";
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async logoutAsync() {
    console.log('logoutAsync');
    this.authToken = null;
    this.username = null;
    return Promise.resolve();
  }

  async getMyMortgagesAsync() {
    console.log("Awaiting fake latency");
    await fakeLatencyAsync();

    if (!this.username) {
      return Promise.resolve([]);
    }

    return Promise.resolve(Array.from(this.myMortgages, ([key, value]) => value));
  }

  async getUserAsync() {
    return Promise.resolve({
      email: "mtolley@synopsys.com",
      title: "Mr",
      givenName: "Scott",
      familyName: "Tolley"
    });
  }

  async requestApproval(propertyDetails, cardDetails) {
    this.myMortgages.set(this.nextMortgageId, {
      id: this.nextMortgageId,
      address1: propertyDetails.address1,
      address2: propertyDetails.address2,
      zip: propertyDetails.zip,
      state: propertyDetails.state,
      purchasePrice: propertyDetails.purchasePrice,
      amountToBorrow: propertyDetails.amountToBorrow,
      status: "Approval Pending",
      history: [
        {
          id: 1,
          date: (new Date(Date.now())).toJSON(),
          party: 'Customer',
          event: 'Created',
          details: 'Submitted for approval'
        }
      ]
    });
    this.nextMortgageId++;
  }
}