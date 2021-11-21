// eslint-disable-next-line no-use-before-define
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, message } from "antd";
import { FormInstance } from "antd/lib/form";
import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import db from "@/app/firebase";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  readonly id: string;
  nameclass: string;
  code: string;
  schedule: string;
  subject: string;
  no_student: number;
  name: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type DataType = Item;

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export default class EditableTable extends React.Component<
  EditableTableProps,
  EditableTableState
> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  private unsub?: Unsubscribe;

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: "STT",
        dataIndex: "id",
      },
      {
        title: "Tên Lớp",
        dataIndex: "nameclass",
        editable: true,
      },
      {
        title: "Mã môn",
        dataIndex: "code",
        editable: true,
      },
      {
        title: "Lịch",
        dataIndex: "schedule",
        editable: true,
      },
      {
        title: "Môn học",
        dataIndex: "subject",
        editable: true,
      },
      {
        title: "Sĩ số",
        dataIndex: "no_student",
        editable: true,
      },
      {
        title: "Giáo viên",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "operation",
        render: (record: { key: DataType }) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      // eslint-disable-next-line react/no-unused-state
      count: 4,
    };
  }

  async componentDidMount() {
    this.unsub = onSnapshot(collection(db, "Class"), (doc) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        count: doc.docs.length,
        dataSource: doc.docs.map((e) => ({
          id: e.id,
          ...e.data(),
        })) as DataType[],
      });
    });
  }

  componentWillUnmount(): void {
    if (this.unsub) this.unsub();
  }

  handleDelete = async (row: DataType) => {
    const { id, ...dataWrite } = row;
    await setDoc(doc(db, "Class", id), dataWrite);
  };

  handleAdd = () => {
    //   const { count, dataSource } = this.state;
    //   const newData: DataType = {
    //     key: count,
    //     name: `Edward King ${count}`,
    //     age: "32",
    //     address: `London, Park Lane no. ${count}`,
    //   };
    //   this.setState({
    //     dataSource: [...dataSource, newData],
    //     count: count + 1,
    //   });
    message.success("Add!");
  };

  handleSave = async (row: DataType) => {
    const { id, ...dataWrite } = row;
    await setDoc(doc(db, "Class", id), dataWrite);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Thêm lớp
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          rowKey="id"
        />
      </div>
    );
  }
}
