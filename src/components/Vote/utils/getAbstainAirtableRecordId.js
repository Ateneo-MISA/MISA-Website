const recordIDs = {
  president: 'recOMdvt4Q7TwWGA9',
  vicepresidentforeservices: 'recM0JNz6wVz532vZ',
  vicepresidentforcommunications: 'recAQPsVpVBvqPQg6',
  vicepresidentformarketing: 'reccASzbD2X0O8C9p',
  vicepresidentforevents: 'rec4Wn80zrFlB5zi8',
  vicepresidentforhumanresources: 'recbihewsqw2aSBET',
  secretarygeneral: 'recmWHmXBBUDQPsVw',
  executivetreasurer: 'reczuYuBx9DBRTwl0',
}

export const getAbstainRecordID = (positionNameInState) => {
  return recordIDs[positionNameInState]
}
