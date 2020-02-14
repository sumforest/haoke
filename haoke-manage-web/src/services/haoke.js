import request from "@/utils/request";

export async function addHouseResource(params) {
  return request('/haoke/house/resources',{
    method: 'POST',
    body: params
  })
}

export async function updateHouseResource(params) {
  return request('/haoke/house/resources',{
    method:'PUT',
    body:params
  })

}
