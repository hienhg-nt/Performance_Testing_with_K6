export function extractToken(getRes) {
  return getRes.html()
    .find('input[name="__RequestVerificationToken"]')
    .first()
    .attr('value');
}