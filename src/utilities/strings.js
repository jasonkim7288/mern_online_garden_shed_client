// remove domain such as 'aaa@b.com' -> 'aaa'
export const removeDomain = (email) => {
  if (email && typeof email === 'string') {
    return email.split('@')[0];
  } else {
    return '';
  }
}

// add record number if the record number is greater than 1 such as 'rose (2)'
export const getUniquePlantName = (plantRecord) => {
  if (plantRecord) {
    if (plantRecord.recordNum > 1) {
      return `${plantRecord.commonName} (${plantRecord.recordNum})`;
    } else {
      return plantRecord.commonName;
    }
  } else {
    return '';
  }
}