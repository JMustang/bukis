class ChangeAuthorNameToString < ActiveRecord::Migration[8.0]
  def change
    change_column :authors, :name, :string
  end
end
