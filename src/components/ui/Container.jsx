/**
 * Consistent max-width + gutter wrapper used across every section.
 */
export function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`container-site ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;
