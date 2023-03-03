const data = [
    { name: 'John', published_in: '2022-02-28' },
    { name: 'Mary', published_in: '2022-03-01' },
    { name: 'Jane', published_in: '2022-02-27' },
  ];
  
  // Sort the array by date
  data.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
  console.log(data);
   