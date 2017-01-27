function VirtusKanbanGrid(options)
{
    this.columns = Object.create(null);
    this.container = options.container;
    this.kanban = null;
    this.loadData(options);
}

VirtusKanbanGrid.prototype = {

    getColumn: function(columnId) {
        return this.columns[columnId] ? this.columns[columnId] : null;
    },

    draw: function() {
        
        var docFragment = document.createDocumentFragment();
        
        for (var id in this.columns)
		{
			docFragment.appendChild(this.columns[id].render());
		}

        this.container.appendChild(docFragment);
    },

    addColumn: function(options) {

        options = options || {};

        if (this.getColumn(options.id) !== null)
		{
			return;
		}

        var column = new VirtusKanbanColumn(options);
		column.virtusKanban = this;
		this.columns[options.id] = column;

    },

    loadData: function(json) {

        json.columns.forEach(function(column) {
			this.addColumn(column);
		}, this);

    }
}

function VirtusKanbanColumn(options)
{
    this.id = options.id;
    this.name = options.name;
    this.items = [];
    this.layout = {
        container: null,
        items: null,
        name: null
    }
    this.virtusKanban = null;
}


VirtusKanbanColumn.prototype = {

    createlayout: function() {

        if (this.layout.container !== null)
        {
            return this.layout.container;
        }

        this.layout.container = document.createElement('div');
        this.layout.container.dataset.id = this.id;
        this.layout.container.dataset.type = 'column';

        return this.layout.container;
    },

    render: function() {

        this.createlayout();
        return this.layout.container;
    }

}


var virtusKanban = new VirtusKanbanGrid(
    {
        columns: [
            {
                id: 1,
                name: "Quened"
            },
            {
                id: 2,
                name: "Planning"
            },
            {
                id: 3,
                name: "Design"
            },
            {
                id: 4,
                name: "Development"
            },{
                id: 5,
                name: "Testing"
            },
            {
                id: 6,
                name: "Completed"
            }
        ],

        items: [
            {
                id: 1,
                name: " ",
                columnId: 1
            },
            {
                id: 2,
                name: " ",
                columnId: 1
            },
            {
                id: 3,
                name: " ",
                columnId: 1
            }
        ],

        container: document.getElementById('virtusKanban')
    }
)

virtusKanban.draw();