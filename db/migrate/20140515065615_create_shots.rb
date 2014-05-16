class CreateShots < ActiveRecord::Migration
  def change
    create_table :shots do |t|
      t.string :direction
      t.boolean :received, default: false
      t.timestamps
    end
  end
end
