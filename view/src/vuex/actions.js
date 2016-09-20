import * as types from './mutation_types.js'

export const getLocation = ({ dispatch }, location) => {
  dispatch(types.GET_LOCATION, location)
}
export const regainLocation = ({ dispatch, state }) => {
  dispatch(types.REGAIN_LOCATION)
}
export const changeJgBar = ({ dispatch, state }, jgCode) => {
  dispatch(types.CHANGE_JGBAR, jgCode)
}
export const changeFamilyBar = ({ dispatch, state }, FamilyMsg) => {
  dispatch(types.CHANGE_FAMILYBAR, FamilyMsg)
}
export const changeZcjbBar = ({ dispatch, state }, zcjbCode) => {
  dispatch(types.CHANGE_ZCJBBAR, zcjbCode)
}
export const changeZgxlBar = ({ dispatch, state }, zgxlCode) => {
  dispatch(types.CHANGE_ZGLBBAR, zgxlCode)
}
export const changePeopleNumber = ({ dispatch }, peopleNumber, peopleType) => {
  dispatch(types.CHANGE_PEOPLENUMBER, peopleNumber)
}
export const changeJtdqBar = ({ dispatch, state }, jtdqCode) => {
  dispatch(types.CHANGE_JTDQBAR, jtdqCode)
}
export const changeUploadBackMsg = ({ dispatch, state }, url) => {
  dispatch(types.UPLOAD_BACK_MSG, url)
}
export const regetIndexMsg = ({ dispatch, state }) => {
  dispatch(types.REGET_INDEX_MSG)
}
