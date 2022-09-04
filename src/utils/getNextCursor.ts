interface ObjectWithID {
  _id: string;
  [key: string]: any;
}

function getNextCursor(arr: ObjectWithID[]) {
  return arr.length > 0 ? arr[arr.length - 1]._id : "";
}

export default getNextCursor;
