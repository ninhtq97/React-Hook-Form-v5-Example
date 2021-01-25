import { GlobalState } from 'little-state-machine';

export default function cacheSelect(state: GlobalState, payload: any) {
  console.log('Payload:', payload);

  let existsPage = state.selected.find((x) => x.page === payload.page);

  console.log('Exists Page:', existsPage);

  const pageIndex = state.selected.findIndex((x) => x.page === existsPage.page);
  console.log('Page Index:', pageIndex);

  let selected = [
    ...state.selected,
    ...[{ page: payload.page, rowIds: [payload.rowId] }],
  ];

  if (existsPage) {
    const unSelect = existsPage.rowIds.indexOf(payload.rowId);

    if (unSelect >= 0) {
      existsPage.rowIds.splice(unSelect, 1);
    } else {
      existsPage.rowIds.push(payload.rowId);
    }

    selected = [
      ...state.selected.slice(0, pageIndex),
      existsPage,
      ...state.selected.slice(pageIndex + 1),
    ];
  }

  console.log('selected:', selected);

  return {
    ...state,
    selected: selected,
  };
}
