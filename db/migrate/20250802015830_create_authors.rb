class CreateAuthors < ActiveRecord::Migration[8.0]
  def change
    create_table :authors do |t|
      t.integer :name
      t.date :birth

      t.timestamps
    end
  end
end
