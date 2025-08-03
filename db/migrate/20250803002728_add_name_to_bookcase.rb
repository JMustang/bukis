class AddNameToBookcase < ActiveRecord::Migration[8.0]
  def change
    add_column :bookcases, :name, :string
  end
end
