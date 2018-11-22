const headers = {
  'Accept': 'application/vnd.lidraughts.v2+json'
};

export function reload(baseUrl: string, id: string, chapterId?: string) {
  let url = '/' + baseUrl + '/' + id;
  if (chapterId) url += '/' + chapterId;
  return $.ajax({
    url,
    headers
  });
}

export function variants() {
  return $.ajax({
    url: '/variant',
    headers,
    cache: true
  });
}

export function glyphs() {
  return $.ajax({
    url: window.lidraughts.assetUrl('glyphs.json', { noVersion: true }),
    headers,
    cache: true
  });
}

export function chapterConfig(studyId: string, chapterId: string) {
  return $.ajax({
    url: `/study/${studyId}/${chapterId}/meta`,
    headers
  });
}

export function practiceComplete(chapterId: string, nbMoves: number) {
  return $.ajax({
    method: 'POST',
    url: `/practice/complete/${chapterId}/${nbMoves}`,
    headers
  });
}

export function importPdn(studyId: string, data: any) {
  return $.ajax({
    method: 'POST',
    url: `/study/${studyId}/import-pdn`,
    data: data,
    headers
  });
}

export function multiBoard(studyId: string) {
  return $.ajax({
    url: `/study/${studyId}/multi-board`,
    headers
  });
}
