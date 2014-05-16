# Disable for all serializers (except ArraySerializer)
ActiveModel::Serializer.root = false

# Disable for ArraySerializer (needed when using each_serializer in
# controller)
ActiveModel::ArraySerializer.root = false
