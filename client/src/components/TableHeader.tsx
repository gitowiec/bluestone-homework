import * as React from "react";


class TableHeader extends React.Component {
    render() {
        return (
            <tr>
                <th>ID</th>
                <th>Nazwa produktu</th>
                <th>Akcje</th>
            </tr>
        );
    }
}

export default TableHeader;
