class ShotSerializer < ActiveModel::Serializer
  attributes \
    :id,
    :direction,
    :created_at
end
