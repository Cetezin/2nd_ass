function UserDetails(props) {
    return (
      <div className="details">
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Respository info</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Subcribers</td>
            <td>
              <h5>{props.url}</h5>
            </td>
          </tr>
          <tr>
            <td>Default branch</td>
            <td>
              <h5>{props.branch}</h5>
            </td>
          </tr>
          <tr>
            <td>Repo name</td>
            <td>
              <h5>{props.name}</h5>
            </td>
          </tr>
          <tr>
            <td>Full name</td>
            <td>
              <h5>{props.full_name}</h5>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <h5>{props.description}</h5>
            </td>
          </tr>
          <tr>
            <td>Created</td>
            <td>
              <h5>{props.created_at}</h5>
            </td>
          </tr>
          <tr>
            <td>ID</td>
            <td><h5>{props.id}</h5></td>
          </tr>
          <tr>
            <td>Language</td>
            <td><h5>{props.language}</h5></td>
          </tr>
          <tr>
            <td>Open issues</td>
            <td><h5>{props.open_issues}</h5></td>
          </tr>
          <tr>
            <td>Owner</td>
            <td><h5>{props.owner}</h5></td>
          </tr>
          <tr>
            <td>Visibility</td>
            <td><h5>{props.visibility}</h5></td>
          </tr>
          <tr>
            <td>Watchers</td>
            <td><h5>{props.watchers}</h5></td>
          </tr>
          <tr>
            <td>Forks</td>
            <td><h5>{props.forks}</h5></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

export default UserDetails