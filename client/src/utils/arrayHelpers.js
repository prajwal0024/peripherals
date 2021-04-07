exports.sortByFrequencyAndRemoveDuplicates = (arr) => {
  const frequency = {};
  let value;

  // compute frequencies of each value
  for (let i = 0; i < arr.length; i++)
    if (arr[i] in frequency) frequency[arr[i]]++;
    else frequency[arr[i]] = 1;

  // make array from the frequency object to de-duplicate
  const uniques = [];
  for (value in frequency) uniques.push(value);

  // sort the uniques array in descending order by frequency
  const compareFrequency = (a, b) => frequency[b] - frequency[a];

  return uniques.sort(compareFrequency);
};
