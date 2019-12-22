import { curry } from 'ramda';

export default curry(
  (entity, action, type) => {
    const suffix = type ? `_${type}` : '';
    return `${entity}_${action}${suffix}`;
  },
);
