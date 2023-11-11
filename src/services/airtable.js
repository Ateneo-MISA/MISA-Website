import Airtable from 'airtable'

const API_KEY = process.env.GATSBY_AIRTABLE_API_KEY
const VOTING_BASE_ID = process.env.GATSBY_AIRTABLE_VOTING_BASE_ID
const MERCH_BASE_ID = process.env.GATSBY_AIRTABLE_MERCH_BASE_ID

// To define a new Base, find Base ID in Airtable API page of that Base
let votingBase = new Airtable({
  apiKey: API_KEY,
}).base(VOTING_BASE_ID)

let merchBase = new Airtable({
  apiKey: API_KEY,
}).base(MERCH_BASE_ID)

export const getRecords = async ({ base, tableName }) => {
  let initialRecords = []
  let allRecords = []

  if (base === 'votingBase') {
    initialRecords = await votingBase(tableName).select().all()
  }

  if (base === 'merchBase') {
    initialRecords = await merchBase(tableName).select().all()
  }

  for (let i = 0; i < initialRecords.length; i++) {
    let finalRecord = {
      ...initialRecords[i].fields,
      id: initialRecords[i].id,
    }
    allRecords.push(finalRecord)
  }

  return allRecords
}

export const createRecord = async ({ base, tableName, record }) => {
  if (base === 'votingBase') {
    await votingBase(tableName).create(record)
  }

  if (base === 'merchBase') {
    await merchBase(tableName).create(record)
  }
}

export const updateRecord = async ({ base, tableName, id, fields }) => {
  if (base === 'votingBase') {
    await votingBase(tableName).update([
      {
        id: id,
        fields: fields,
      },
    ])
  }

  if (base === 'merchBase') {
    await merchBase(tableName).update([
      {
        id: id,
        fields: fields,
      },
    ])
  }
}
