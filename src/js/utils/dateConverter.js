function dateConverter (date) {
    return date.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).replace('г.', '');
}

export { dateConverter };