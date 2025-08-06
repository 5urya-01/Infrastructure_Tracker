import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../configure';
import navigation from '../../menus';

class Breadcrumb extends Component {
  state = {
    breadcrumbs: []
  };

  componentDidMount() {
    this.buildBreadcrumbs();
  }

  componentDidUpdate(prevProps) {
    // Check if the location has changed to update breadcrumbs
    if (this.props.location !== prevProps.location) {
      this.buildBreadcrumbs();
    }
  }

  buildBreadcrumbs = () => {
    const { location } = this.props;
    const pathSegments = location.pathname.split('/').filter((segment) => segment); // Remove empty segments
    const breadcrumbLinks = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`; // Build the path for each segment
      const navItem = this.findNavItem(path); // Look for the nav item in the configuration

      return { title: navItem ? navItem.title : segment, path }; // Use title from navItem or fallback to segment
    });

    this.setState({ breadcrumbs: breadcrumbLinks });
  };

  findNavItem = (path) => {
    // Search through navigation items to find the corresponding item for the path
    for (const item of navigation.items) {
      if (item.children) {
        const foundItem = this.findInChildren(item.children, path);
        if (foundItem) {
          return foundItem;
        }
      } else if (item.url && (config.basename + item.url) === path) {
        return item;
      }
    }
    return null;
  };

  findInChildren = (children, path) => {
    for (const child of children) {
      if (child.type === 'collapse' && child.children) {
        const foundItem = this.findInChildren(child.children, path);
        if (foundItem) {
          return foundItem;
        }
      } else if (child.type === 'item' && (config.basename + child.url) === path) {
        return child;
      }
    }
    return null;
  };

  render() {
    const { breadcrumbs } = this.state;
    const title = breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].title : 'Welcome';

    // Set document title
    document.title = `${title} | Elite Able Premium React Redux Admin Template`;

    return (
      <div className="col-md-12">
        <div className="page-header-title">
          <h5>{title}</h5>
        </div>
        <ul className="breadcrumb">
          
          {breadcrumbs.map((crumb, index) => (
            <li className="breadcrumb-item" key={index}>
              <Link to={crumb.path}>{crumb.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Breadcrumb;
