export const getContentHeight = (): any => {
  const header = document.querySelector('#header');
  const body = document.querySelector('body');
  if (body && header) {
    const percent = (100 - (header.clientHeight * 100 / body.clientHeight));
    return {
      height: body.clientHeight - header.clientHeight,
      percent: percent,
      total: body.clientHeight
    }
  }
}
