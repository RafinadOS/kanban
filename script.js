function VirtusKanbanGrid(options)
{
    this.columns = Object.create(null);
    this.items = Object.create(null);
    this.container = options.container;
    this.kanban = null;
    this.loadData(options);
}

VirtusKanbanGrid.prototype = {

    getColumn: function(columnId) {
        return this.columns[columnId] ? this.columns[columnId] : null;
    },

    getItem: function(itemId) {
		return this.items[itemId] ? this.items[itemId] : null;
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

    addItem: function(options) {

        options = options || {};

        if (this.getItem(options.id) !== null)
		{
			return;
		}

        var column = this.getColumn(options.columnId);

        if (column)
		{
			var item = new VirtusKanbanItem(options);
			item.kanban = this;

			this.items[options.id] = item;
			column.addItem(item);
		}

    },

    loadData: function(json) {

        json.columns.forEach(function(column) {
			this.addColumn(column);
		}, this);

        json.items.forEach(function(item) {
			this.addItem(item);
		}, this);

    }
}

function VirtusKanbanColumn(options)
{
    this.id = options.id;
    this.name = options.name;
    this.items = [];
    this.layout = {
        header: null,
        container: null,
        items: null,
        name: null,
        totalPrice: null,
        count: null
    }
    this.virtusKanban = null;
}

VirtusKanbanColumn.prototype = {

    addItem: function(item, beforeItem) {
		if (!item instanceof VirtusKanbanItem)
		{
			throw "item must be an instance of KanbanItem";
		}

		item.columnId = this.id;

        var index = -1;

        if(beforeItem)
        {
            for(var i = 0; i < this.items.length; i++)
            {
                if(this.items[i] == beforeItem)
                {
                    index = i;
                }
            }
        }

        if (index >= 0) 
        {
			this.items.splice(index, 0, item);
		}
		else
		{
			this.items.push(item);
		}

		if (this.layout.container)
		{
			this.render();

        }
	},

    createLayout: function() {

        if (this.layout.container !== null)
        {
            return this.layout.container;
        }

        // column layout
        this.layout.container = document.createElement('div');
        this.layout.container.className = 'column';

        // column header
        this.layout.header = document.createElement('div');
        this.layout.header.className = 'column__header';

        // column title layout
        this.layout.name = document.createElement('div');
        this.layout.name.innerHTML = this.name;
        this.layout.header.appendChild(this.layout.name);

        // column items layout
        this.layout.items = document.createElement('div');
        this.layout.items.className = 'column__items'
        this.layout.items.dataset.id = this.id;
        this.layout.items.dataset.type = 'column';

        // insert all div's in parent
        this.layout.container.appendChild(this.layout.header);
        this.layout.container.appendChild(this.layout.items);

        return this.layout.container;

    },

    render: function() {

        if (this.layout.container === null)
		{
			this.createLayout();
		}

        for (var i = 0; i < this.items.length; i++)
		{
			var item = this.items[i];
			this.layout.items.appendChild(item.render());
		}

        return this.layout.container;

    }
}

function VirtusKanbanItem(options)
{
    this.id = options.id;
    this.name = options.name;
    this.userId = options.userId;
    this.price = options.price;
    this.columnId = options.columnId;
    this.layout = {
        container: null,
        info: null,
        title: null,
        price: null,
        userAvatar: null
    }
}

VirtusKanbanItem.prototype = {
    
    render: function() {
        if (this.layout.container === null)
        {
            // item wrapper
            this.layout.container = document.createElement('div');
            this.layout.container.className = 'item';
            this.layout.container.dataset.id = this.id;

            // item title
            this.layout.userAvatar = document.createElement('div');
            this.layout.userAvatar.className = 'item__user';

            // item title
            this.layout.title = document.createElement('div');
            this.layout.title.className = 'item__title';
            this.layout.title.innerHTML = this.name;

            // item price
            this.layout.price = document.createElement('div');
            this.layout.price.className = 'item__price';

            // item info
            this.layout.info = document.createElement('div');
            this.layout.info.className = 'item__info';
            this.layout.info.appendChild(this.layout.title);
            this.layout.info.appendChild(this.layout.price);

            this.layout.container.appendChild(this.layout.userAvatar);
            this.layout.container.appendChild(this.layout.info);

			this.makeDraggable(this.layout.container);

            return this.layout.container;
        }
    },

	makeDraggable: function (itemDragBlock)
	{
		jsDD.registerObjects(itemDragBlock);

		var itemContainer = this.render();
		
		this.onDragStart();
	},

	
	
	
	onDragStart: function ()
	{

	}

};

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
            },
            {
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
                name: "Create Wordpress theme",
                columnId: 1
            },
            {
                id: 2,
                name: "Fix bags",
                columnId: 1
            },
            {
                id: 3,
                name: "Return to version 17.2",
                columnId: 1
            },
            {
                id: 4,
                name: "will send mail",
                columnId: 2
            },
            {
                id: 5,
                name: "will send mail",
                columnId: 2
            },
            {
                id: 6,
                name: "will send mail",
                columnId: 2
            },
            {
                id: 7,
                name: "will send mail",
                columnId: 2
            },
            {
                id: 8,
                name: "will send mail",
                columnId: 3
            }
        ],

        container: document.getElementById('virtusKanban')
    }
);

virtusKanban.draw();